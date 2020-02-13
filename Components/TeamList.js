import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import TeamItem from './TeamItem'
import { connect } from 'react-redux'

class TeamList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teams: []
        }
    }

    _displayDetailForTeam = (idTeam) => {
        this.props.navigation.navigate('TeamDetail', {idTeam: idTeam})
        
    }

    render() {
        return (
            <FlatList
            style={styles.list}
            data={this.props.teams}
            extraData={this.props.favoritesTeam}
            keyExtractor={(item) => item.idTeam.toString()}
            renderItem={({item}) => (
                <TeamItem 
                    team={item}
                    isTeamFavorite={(this.props.favoritesTeam.findIndex(team => team.idTeam === item.idTeam) !== -1) ? true : false}
                    displayDetailForTeam={this._displayDetailForTeam}
                />
            )}
            />

        
        )
    }


}

const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })
  
  const mapStateToProps = state => {
    return {
      favoritesTeam: state.favoritesTeam
    }
  }
  
  export default connect(mapStateToProps)(TeamList)