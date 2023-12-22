import { Box } from "native-base";

interface Props  {
    children? : any,
    bg? : any,
    width? : any,
    p? : any,
    shadow? : any
}

export default function BoxCustom({children, bg, width, p, shadow, ...props} : Props ) {
    return (
        <Box bg={bg} width={width} p={p} shadow={shadow} {...props}>
            {children}
        </Box>
    )
}