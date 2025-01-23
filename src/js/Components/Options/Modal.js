const {
    i18n: {
        __,
    },
    components: {
        TextControl,
        ToggleControl,
        Card,
        CardHeader,
        CardBody,
        BaseControl,
        DropdownMenu,
        SelectControl,
        ColorPalette,
        ColorIndicator,
        __experimentalHStack: HStack,
    }
} = wp;

const ModalOpts = ({ formData, setFormData, setStyle, colors }) => {
    return (
        <Card className="border shadow-none h-100">
            <CardHeader>
                <h5 className="text-uppercase fw-medium m-0">{__('Modal', 'glimfse')}</h5>
            </CardHeader>
            <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                <p>
                    <SelectControl
                        label={__('Position', 'glimfse')}
                        value={formData?.modal?.position}
                        options={[
                            { label: __('Top', 'glimfse'), value: 'top' },
                            { label: __('Centered', 'glimfse'), value: 'centered' },
                            { label: __('Custom', 'glimfse'), value: 'custom' },
                        ]}
                        onChange={position => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    position
                                }
                            }
                        })}
                        help={__('Relative to the browser window.', 'glimfse')}
                        __nextHasNoMarginBottom
                    />
                </p>
                <p>
                    <TextControl
                        label={__('Title', 'glimfse')}
                        value={formData?.modal?.title}
                        onChange={title => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    title
                                }
                            }
                        })}
                        help={__('The title for the modal.', 'glimfse')}
                    />
                </p>
                <p>
                    <SelectControl
                        label={__('Backdrop', 'glimfse')}
                        value={formData?.modal?.backdrop}
                        options={[
                            { label: __('Enabled', 'glimfse'), value: 'true' },
                            { label: __('Static', 'glimfse'), value: 'static' },
                            { label: __('Disabled', 'glimfse'), value: 'false' },
                        ]}
                        onChange={backdrop => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    backdrop
                                }
                            }
                        })}
                        help={formData?.modal?.backdrop !== 'false' && sprintf(
                            __('Clicking backdrop will %s modal.', 'glimfse'),
                            formData?.modal?.backdrop === 'static' ? __('not close', 'glimfse') : __('close', 'glimfse')
                        )}
                        __nextHasNoMarginBottom
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Close offcanvas', 'glimfse')}
                        checked={formData?.modal?.closeOffcanvas}
                        onChange={closeOffcanvas => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    closeOffcanvas
                                }
                            }
                        })}
                        help={sprintf(
                            __('Offcanvas will %s when modal is active.', 'glimfse'),
                            formData?.modal?.closeOffcanvas ? __('close', 'glimfse') : __('not close', 'glimfse')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Show close button', 'glimfse')}
                        checked={formData?.modal?.close}
                        onChange={close => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    close
                                }
                            }
                        })}
                        help={sprintf(
                            __('Modal close button is %s.', 'glimfse'),
                            formData?.modal?.close ? __('shown', 'glimfse') : __('not shown', 'glimfse')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Keyboard control', 'glimfse')}
                        checked={formData?.modal?.keyboard}
                        onChange={keyboard => setFormData({
                            ...formData, ...{
                                modal: {
                                    ...formData?.modal,
                                    keyboard
                                }
                            }
                        })}
                        help={sprintf(
                            __('Modal %s be closed with ESC key.', 'glimfse'),
                            formData?.modal?.keyboard ? __('can', 'glimfse') : __('cannot', 'glimfse')
                        )}
                    />
                </p>
                <p>
                    <BaseControl label={__('Colors', 'glimfse')}>
                        <HStack style={{ justifyContent: 'flex-start' }}>
                            <DropdownMenu
                                label={__('Background Color', 'glimfse')}
                                icon={<ColorIndicator colorValue={formData?.modal?.style?.backgroundColor} />}
                                toggleProps={{
                                    style: {
                                        height: 'initial',
                                        minWidth: 'initial',
                                        padding: 0
                                    }
                                }}
                                popoverProps={{
                                    focusOnMount: 'container',
                                    position: 'bottom',
                                    noArrow: false,
                                }}
                            >
                                {() => (
                                    <ColorPalette
                                        colors={colors}
                                        enableAlpha
                                        value={formData?.modal?.style?.backgroundColor}
                                        onChange={backgroundColor => setStyle({ backgroundColor }, 'modal')}
                                    />
                                )}
                            </DropdownMenu>
                            <DropdownMenu
                                label={__('Text Color', 'glimfse')}
                                icon={<ColorIndicator colorValue={formData?.modal?.style?.color} />}
                                toggleProps={{
                                    style: {
                                        height: 'initial',
                                        minWidth: 'initial',
                                        padding: 0
                                    }
                                }}
                                popoverProps={{
                                    focusOnMount: 'container',
                                    position: 'bottom',
                                    noArrow: false,
                                }}
                            >
                                {() => (
                                    <ColorPalette
                                        colors={colors}
                                        enableAlpha
                                        value={formData?.modal?.style?.color}
                                        onChange={color => setStyle({ color }, 'modal')}
                                    />
                                )}
                            </DropdownMenu>
                        </HStack>
                    </BaseControl>
                </p>
            </CardBody>
        </Card>
    );
};

export default ModalOpts;