import { Icon, Button as NativeButton } from "native-base";


interface Props {
    content: string;
    variation?: string;
    icon?: any;
    handleClick: () => void
}

export default function Button ( {content, variation = 'primary', icon, handleClick}: Props) {
    return (
        <NativeButton bg={`${variation}.100`} mt={3} onPress={handleClick} endIcon={icon} testID="button-test" >
            {content}
        </NativeButton>
    )
}