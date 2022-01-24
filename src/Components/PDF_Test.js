import React from 'react';
import { Page, Text, View, Document, StyleSheet,PDFViewer } from '@react-pdf/renderer';



export default function PDF() {// Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    // Create Document Component
    const MyDocument = () => (
        <Document>
            <Page size="A4" >
                <View style={styles.page}>
                    <Text style={styles.section}>Section #2</Text>
                    <Text style={styles.section}>Section #1</Text>
                    <Text style={styles.section}>Section #2</Text>
                </View>
                <View >
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
                <Text>Section #2</Text>
            </View>
                
            </Page>
            
        </Document>
    );

    return <PDFViewer style={{width:"100vw",height:"100vh"}}>
        <MyDocument />
    </PDFViewer>
}