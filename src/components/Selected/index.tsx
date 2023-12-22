import React from "react"
import {Text} from "react-native"
import BoxCustom from "../Box"
interface Props {
    text : string
}
export default function Selected({text} : Props) {
    return (
        <BoxCustom bg="gray.500" children={<Text >{text}</Text>} width="100%" p="4" shadow={5} />
    )
}