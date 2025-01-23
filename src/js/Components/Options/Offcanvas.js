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

const OffcanvasOpts = ({ formData, setFormData, setStyle, colors }) => {
    return (
        <Card className="border shadow-none h-100">
            <CardHeader>
                <h5 className="text-uppercase fw-medium m-0">{__('Offcanvas', 'glimfse')}</h5>
            </CardHeader>
            <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                <p>
                    <SelectControl
                        label={__('Position', 'glimfse')}
                        value={formData?.offcanvas?.position}
                        options={[
                            { label: __('Top', 'glimfse'), value: 'top' },
                            { label: __('Bottom', 'glimfse'), value: 'bottom' },
                        ]}
                        onChange={position => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
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
                        value={formData?.offcanvas?.title}
                        onChange={title => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    title
                                }
                            }
                        })}
                        help={__('The title for the offcanvas.', 'glimfse')}
                    />
                </p>
                <p>
                    <SelectControl
                        label={__('Backdrop', 'glimfse')}
                        value={formData?.offcanvas?.backdrop}
                        options={[
                            { label: __('Enabled', 'glimfse'), value: 'true' },
                            { label: __('Static', 'glimfse'), value: 'static' },
                            { label: __('Disabled', 'glimfse'), value: 'false' },
                        ]}
                        onChange={backdrop => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    backdrop
                                }
                            }
                        })}
                        help={formData?.offcanvas?.backdrop !== 'false' && sprintf(
                            __('Clicking backdrop will %s offcanvas.', 'glimfse'),
                            formData?.offcanvas?.backdrop === 'static' ? __('not close', 'glimfse') : __('close', 'glimfse')
                        )}
                        __nextHasNoMarginBottom
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Allow scroll', 'glimfse')}
                        checked={formData?.offcanvas?.scroll}
                        onChange={scroll => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    scroll
                                }
                            }
                        })}
                        help={sprintf(
                            __('Scroll is %s when offcanvas is active.', 'glimfse'),
                            formData?.offcanvas?.scroll ? __('allowed', 'glimfse') : __('not allowed', 'glimfse')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Show close button', 'glimfse')}
                        checked={formData?.offcanvas?.close}
                        onChange={close => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    close
                                }
                            }
                        })}
                        help={sprintf(
                            __('Offcanvas close button is %s.', 'glimfse'),
                            formData?.offcanvas?.close ? __('shown', 'glimfse') : __('not shown', 'glimfse')
                        )}
                    />
                </p>
                <p>
                    <ToggleControl
                        label={__('Keyboard control', 'glimfse')}
                        checked={formData?.offcanvas?.keyboard}
                        onChange={keyboard => setFormData({
                            ...formData, ...{
                                offcanvas: {
                                    ...formData?.offcanvas,
                                    keyboard
                                }
                            }
                        })}
                        help={sprintf(
                            __('Offcanvas %s be closed with ESC key.', 'glimfse'),
                            formData?.offcanvas?.keyboard ? __('can', 'glimfse') : __('cannot', 'glimfse')
                        )}
                    />
                </p>
                <p>
                    <BaseControl label={__('Colors', 'glimfse')}>
                        <HStack style={{ justifyContent: 'flex-start' }}>
                            <DropdownMenu
                                label={__('Background Color', 'glimfse')}
                                icon={<ColorIndicator colorValue={formData?.offcanvas?.style?.backgroundColor} />}
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
                                        value={formData?.offcanvas?.style?.backgroundColor}
                                        onChange={backgroundColor => setStyle({ backgroundColor })}
                                    />
                                )}
                            </DropdownMenu>
                            <DropdownMenu
                                label={__('Text Color', 'glimfse')}
                                icon={<ColorIndicator colorValue={formData?.offcanvas?.style?.color} />}
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
                                        value={formData?.offcanvas?.style?.color}
                                        onChange={color => setStyle({ color })}
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

export default OffcanvasOpts;