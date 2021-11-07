import React from 'react';
import { View, Text, Button } from 'react-native';

function CartFooter({ total, count, clearEvent, orderEvent }) {

    // clear 
    function clearFunc() {
        if (clearEvent) {
            clearEvent()
        }
    }

    // order
    function orderFunc() {
        if (orderEvent) {
            order()
        }
    }

    return (
        <View style={{ color: '#8f8f8f', backgroundColor: "#fff" }}>
            <View style={styles.textInline}>
                <Text style={{ marginLeft: '3%', marginBottom: '10%' }}>{count} goods</Text>
                <Text style={{ marginRight: '3%' }}>Total: ${total}</Text>
            </View>
            <View style={styles.buttonStyle1}>
                <Button title="clear" onPress={clearFunc}></Button>
            </View>
            <View style={styles.buttonStyle2}>
                <Button variant="contained" backgroundColor="#e7e7e7" color="#f39442" title="checkout" onPress={orderFunc}></Button>
            </View>
        </View>
    )
}

const styles = {
    textInline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '3%',
    },
    buttonStyle1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: '-10%',
    },
    buttonStyle2: {
        borderColor: '#e7e7e7',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: '10%',

    }

};
export default CartFooter