import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import TeamItem from './TeamItem'
import { getTeamsFromApiWithSearchedText } from '../API/FCApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadTeams() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getTeamsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ 
                    teams: data.teams, 
                   isLoading: false 
                })
            })
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._loadTeams()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Équipe" />
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._loadTeams()} />
                <FlatList
                    data={this.state.teams}
                    keyExtractor={(item) => item.idTeam.toString()}
                    renderItem={({ item }) => <TeamItem team={item} />}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 30,
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search