/**
 * @package: 	GlimFSE Cookies Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.glimfse.com/
 * @version:	1.0.0
 */

import {
    Toggler,
    CookiesTable,
    ModalOpts,
    TogglerOpts,
    OffcanvasOpts,
    NotificationsOpts
} from './Components';

const {
    i18n: {
        __,
        _x,
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Button,
        Notice,
        TabPanel,
        TextControl,
        ToggleControl,
        __experimentalNumberControl: NumberControl,
    },
    element: {
        useState,
    },
    blockEditor: {
        useSetting,
    },
} = wp;

const getEditorUrl = (object = {}) => {
    const url = new URL(`${glimfse.adminUrl}/site-editor.php`);
    Object.keys(object).map(key => url.searchParams.append(key, object[key]));

    return url.toString();
}

addFilter('glimfse.admin.tabs.plugins', 'glimfse/cookies/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'glim-cookies',
        title: __('Cookies', 'glimfse'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading', 'glimfse'),
            instructions: __('Please wait, loading settings...', 'glimfse')
        }} />;
    }

    const apiOptions = (({ cookies }) => (cookies))(settings);
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState(apiOptions);
    const [cookies, setCookies] = useState(false);

    const setStyle = (extra = {}, container = 'offcanvas') => {
        const newStyle = { ...formData?.[container]?.style, ...extra };

        setFormData({
            ...formData, ...{
                [container]: {
                    ...formData?.[container],
                    style: newStyle
                }
            }
        });
    };

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'glimfse'));
    };

    const colors = useSetting('color.palette');

    return (
        <>
            {formData.notice !== false && (
                <Notice status="info" className="border-top border-bottom border-end mb-3" onRemove={() => setFormData({ ...formData, notice: false })}>
                    <p className="my-0" dangerouslySetInnerHTML={{
                        __html: sprintf(
                            _x('You can edit module messages/templates under %s.', 'glimfse'),
                            `<a href="${getEditorUrl({
                                path: '/patterns',
                                categoryType: 'wp_template_part',
                                categoryId: 'glim-cookies',
                            })}" target="_blank">${__('Site Editor', 'glimfse')}</a>`
                        )
                    }} />
                </Notice>
            )}
            <TabPanel
                onSelect={() => { }}
                tabs={[
                    {
                        name: 'cookies',
                        title: __('Cookies', 'glimfse'),
                        render:
                            <>
                                <Card className="border shadow-none">
                                    <CardHeader>
                                        <h5 className="text-uppercase fw-medium m-0">{__('Cookies', 'glimfse')}</h5>
                                    </CardHeader>
                                    <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                                        <p>
                                            <ToggleControl
                                                label={__('Block cookies', 'glimfse')}
                                                checked={formData?.cookies?.block}
                                                onChange={block => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        block
                                                    }
                                                })}
                                                help={sprintf(
                                                    __('Cookies are %s until preference is set.', 'glimfse'),
                                                    formData?.cookies?.block ? __('blocked', 'glimfse') : __('not blocked', 'glimfse')
                                                )}
                                            />
                                        </p>
                                        <p>
                                            <NumberControl
                                                label={__('Expiration', 'glimfse')}
                                                value={formData?.cookies?.expire}
                                                onChange={expire => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        expire
                                                    }
                                                })}
                                                help={__('Duration for cookie accept|reject - in days.', 'glimfse')}
                                            />
                                        </p>
                                        <p>
                                            <TextControl
                                                label={__('Necessary cookies', 'glimfse')}
                                                value={formData?.cookies?.necessary}
                                                onChange={necessary => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        necessary
                                                    }
                                                })}
                                                help={__('These cookies are stictly necessary and website cannot function properly without them.', 'glimfse')}
                                            />
                                        </p>
                                        <p>
                                            <TextControl
                                                label={__('Necessary cookies prefix', 'glimfse')}
                                                value={formData?.cookies?.necessaryPrefix}
                                                onChange={necessaryPrefix => setFormData({
                                                    ...formData, cookies: {
                                                        ...formData?.cookies,
                                                        necessaryPrefix
                                                    }
                                                })}
                                                help={__('Cookies starting with these prefixes will also be considered necessary.', 'glimfse')}
                                            />
                                        </p>
                                    </CardBody>
                                </Card>
                                <hr style={{ margin: '20px 0' }} />
                                <Button
                                    className="button"
                                    isPrimary
                                    isLarge
                                    icon={loading && <Spinner />}
                                    onClick={() => {
                                        setLoading(true);
                                        saveSettings({ cookies: formData }, handleNotice);
                                    }}
                                    {...{ disabled: loading }}
                                >
                                    {loading ? '' : __('Save', 'glimfse')}
                                </Button>
                                <hr style={{ margin: '20px 0' }} />
                                <CookiesTable {...{
                                    formData,
                                    setFormData,
                                    cookies,
                                    setCookies,
                                    createNotice
                                }} />
                            </>

                    },
                    {
                        name: 'design',
                        title: __('Design', 'glimfse'),
                        render:
                            <>
                                <div className="grid" style={{ '--glim--columns': 2 }}>
                                    <div className="g-col-1">
                                        <OffcanvasOpts {...{ formData, setFormData, setStyle, colors }} />
                                    </div>
                                    <div className="g-col-1">
                                        <ModalOpts {...{ formData, setFormData, setStyle, colors }} />
                                    </div>
                                    <div className="g-col-1">
                                        <TogglerOpts {...{ formData, setFormData, setStyle, colors }} />
                                    </div>
                                    <div className="g-col-1">
                                        <NotificationsOpts {...{ formData, setFormData }} />
                                    </div>
                                </div>
                                <Toggler {...{ formData: formData?.toggler }} />
                                <hr style={{ margin: '20px 0' }} />
                                <Button
                                    className="button"
                                    isPrimary
                                    isLarge
                                    icon={loading && <Spinner />}
                                    onClick={() => {
                                        setLoading(true);
                                        saveSettings({ cookies: formData }, handleNotice);
                                    }}
                                    {...{ disabled: loading }}
                                >
                                    {loading ? '' : __('Save', 'glimfse')}
                                </Button>
                            </>
                    },
                ]}>
                {({ render }) => render}
            </TabPanel>
        </>
    );
};

export default Options;