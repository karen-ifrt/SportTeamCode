import React from 'react'
import { View, Button, TextInput } from 'react-native'

class Search extends React.Component {
    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <TextInput style={{ marginLeft: 5, marginRight: 5, height: 50, borderColor: '#000000', borderWidth: 1, paddingLeft: 5 }} placeholder="Equipe"/>
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => {}}/>
            </View>
        )
    }
}

const styles = {
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
    }
}

export default Search