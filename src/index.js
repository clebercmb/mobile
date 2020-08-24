import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api'

// Não possuem valor semântico (significado)
// Não possuem estilização própria
// Todos os componentes pussuem por padrão "display: flex"

// View: div, footer, header, main, aside, section
// Text: o, span, strong, h1, h2, h3

export default function App() {

    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        console.log('>>>useEffect******')
        api.get('repositories').then(response => {
            console.log('>>response.data=',response.data)
            setRepositories(response.data)
        })

    }, [])

    async function handleAddRepositorie() {
        const response = await api.post('repositories', 
        {
            title: `Novo repositório ${Date.now()}`,
            url: "https://github.com/clebercmb/desafio-02-conceitos-do-node-js",
	        techs: ["Node.js", "yarn"]
        })

        const repositorie = response.data
        setRepositories([...repositories, repositorie])
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={repositories}
                    keyExtractor={repositorie=>repositorie.id}
                    renderItem={({item: repositorie}) => (
                        <Text style={styles.repositorie}>{repositorie.title}</Text>       
                    )}
                />
                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddRepositorie}>
                        <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>               
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#7159c1',

    },
    repositorie: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }


})