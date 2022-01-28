import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input as InputBox,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import Colors from '../utils/useColor';

export default function Input({
                                  id = '',
                                  label = '',
                                  isRequired = false,
                                  type = 'email',
                                  readOnly = false,
                                  value = null,
                                  helper = null,
                                  onChange = () => {
                                      //
                                  },
                                  isDisabled = false,
                                  size = 'md',
                                  placeholder = `Enter ${label.toLowerCase()}`
                              }) {
    const [active, setActive] = useState(value);

    return (
        <FormControl
            id={id}
            isReadOnly={readOnly}
            isDisabled={isDisabled}
            isRequired={isRequired}
            pos="relative"
        >
            <FormLabel
                pos="absolute"
                transform={`translateY(${active ? '-20px' : '0'})`}
                bottom={'0'}
                zIndex="10"
                fontSize={active ? 'xs' : '14px'}
            >
                {label}
            </FormLabel>
            <InputBox
                // borderColor={Colors.red}
                onChange={onChange}
                value={value}
                placeholder={(active || !label) ? placeholder : ""}
                type={type}
                focusBorderColor={Colors.primary}
                _focus={{border: 0, borderBottom: `1px solid ${Colors.primary}`}}
                size={size}
                fontSize="sm"
                rounded={'0'}
                px="0"
                border="0"
                borderBottom="1px"
                onFocus={() => setActive(true)}
                onBlur={() => {
                    if (!value) {
                        setActive(false);
                    }
                }}
            />
            {helper && (
                <FormHelperText pos={'absolute'} bottom={-3} fontSize={'10px'}>
                    {helper}
                </FormHelperText>
            )}
        </FormControl>
    );
}
