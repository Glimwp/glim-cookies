const {
    i18n: {
        __,
    },
    components: {
        Modal,
        Button,
        ButtonGroup,
        TextControl,
        TextareaControl,
        SelectControl,
        Spinner,
        Placeholder,
        Dashicon,
        Tooltip
    },
    element: {
        useEffect,
        useState,
        useRef,
    },
} = wp;

const { categories = [] } = glimfseCookies || {};

const ManageCookie = ({ closeModal, createNotice, currentCookie, setCookies }) => {
    const [data, setData] = useState(currentCookie ?? { name: '', duration: '', category: '', description: '' });
    const [doingAjax, setDoingAjax] = useState(null);
    const formRef = useRef(null);

    const handleCookie = async () => {
        setDoingAjax(true);

        const formData = new FormData(formRef.current);
        if (currentCookie) {
            // Add name for editing cookie (as the input is disabled);
            formData.set('name', currentCookie?.name);
        }

        const response = await fetch(`${glimfse.restUrl}/manage_cookies`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        setCookies(data);
        setDoingAjax(false);

        createNotice('success', sprintf(__('Cookie %s.', 'glimfse'), currentCookie ? __('updated', 'glimfse') : __('added', 'glimfse')));

        closeModal();
    };

    const objectHasEmptyValues = (obj) => Object.keys(obj).filter(key => obj[key] === '').length;

    return (
        <Modal title={currentCookie ? sprintf(__('Edit "%s" cookie', 'glimfse'), currentCookie?.name) : __('Add cookie', 'glimfse')} onRequestClose={closeModal}>
            <form ref={formRef}>
                <TextControl
                    label={__('Cookie name', 'glimfse')}
                    name="name"
                    value={data?.name}
                    disabled={currentCookie}
                    required
                    onChange={(name) => setData({ ...data, name })}
                />
                <TextControl
                    label={__('Duration', 'glimfse')}
                    name="duration"
                    help={__('Cookie duration - a string like: 30 days.', 'glimfse')}
                    required
                    value={data?.duration}
                    onChange={(duration) => setData({ ...data, duration })}
                />
                <SelectControl
                    label={__('Category', 'glimfse')}
                    name="category"
                    options={Object.keys(categories).map(key => {
                        return {
                            label: key === 'null' ? __('Select a category', 'glimfse') : categories[key],
                            value: key === 'null' ? '' : key,
                            disabled: key === 'null'
                        }
                    })}
                    help={__('Cookie category to be used on filters.', 'glimfse')}
                    required
                    value={data?.category}
                    onChange={(category) => setData({ ...data, category })}
                />
                <TextareaControl
                    label={__('Description', 'glimfse')}
                    name="description"
                    cols="50"
                    help={__('Cookie information related to the cookie.', 'glimfse')}
                    required
                    value={data?.description}
                    onChange={(description) => setData({ ...data, description })}
                />
                <Button
                    className="button d-flex gap-2"
                    isPrimary
                    disabled={doingAjax || objectHasEmptyValues(data)}
                    icon={doingAjax && <Spinner style={{ margin: 0 }} />}
                    onClick={handleCookie}
                >
                    {currentCookie ? __('Update cookie', 'glimfse') : __('Add cookie', 'glimfse')}
                </Button>
            </form>
        </Modal>
    );
}

const CookiesTable = ({ formData, setFormData, cookies, setCookies, createNotice }) => {
    const [currentCookie, setCurrentCookie] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [doingAjax, setDoingAjax] = useState(false);

    useEffect(() => {
        async function fetchCookies() {
            const response = await fetch(`${glimfse.restUrl}/manage_cookies`, {
                method: 'GET'
            });

            const data = await response.json();

            setCookies(data);
        }

        fetchCookies();
    }, []);

    if (cookies === false) {
        return (
            <Placeholder instructions={__('Loading cookies...', 'glimfse')} />
        );
    }

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th>{__('Cookie name', 'glimfse')}</th>
                        <th>{__('Description', 'glimfse')}</th>
                        <th>{__('Duration', 'glimfse')}</th>
                        <th>{__('Category', 'glimfse')}</th>
                        <th style={{
                            width: '1px',
                            whiteSpace: 'nowrap'
                        }}>{__('Actions', 'glimfse')}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(cookies).length ? Object.keys(cookies).map(key => {
                        const { name, description, duration = '-', category } = cookies[key];

                        return (
                            <tr key={key}>
                                <td>{name ?? key}</td>
                                <td>{description}</td>
                                <td>{duration}</td>
                                <td>{categories?.[category] ? categories[category] : '-'}</td>
                                <td>
                                    {name ? <ButtonGroup style={{ display: 'flex' }}>
                                        <Button variant="secondary" isSmall onClick={() => {
                                            setIsOpen(true);
                                            setCurrentCookie(cookies[key]);
                                        }}><Dashicon icon="edit" /></Button>
                                        <Button variant="secondary" isDestructive isSmall disabled={doingAjax} onClick={async () => {
                                            setDoingAjax(true);

                                            const formData = new FormData();
                                            formData.set('name', name);
                                            formData.set('remove', true);

                                            const response = await fetch(`${glimfse.restUrl}/manage_cookies`, {
                                                method: 'POST',
                                                body: formData
                                            });

                                            const data = await response.json();

                                            setCookies(data);
                                            setDoingAjax(false);

                                            createNotice('success', sprintf(__('Cookie "%s" has been removed.', 'glimfse'), name));
                                        }}><Dashicon icon="trash" /></Button>
                                    </ButtonGroup> :
                                        <Tooltip text={__('This cookie is added via API - it cannot be modified.', 'glimfse')}>
                                            <Dashicon icon="lock" />
                                        </Tooltip>}
                                </td>
                            </tr>
                        );
                    }) : <tr style={{ textAlign: 'center' }}>
                        <td colSpan={5}>{__('No cookies added yet - please add some using the button bellow.', 'am2')}</td>
                    </tr>}
                </tbody>
            </table>
            <Button className="button" onClick={() => setIsOpen(true)}>{__('Add cookies', 'glimfse')}</Button>
            {isOpen && <ManageCookie {...{ formData, setFormData, createNotice, currentCookie, setCookies }} closeModal={() => {
                setIsOpen(false);
                setCurrentCookie(null);
            }} />}
        </>
    );
};

export default CookiesTable;