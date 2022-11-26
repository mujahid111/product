import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Button(props) {
    return (
        <TouchableOpacity {...props} >
            <>
                {props.children}
            </>
        </TouchableOpacity>
    )
}
