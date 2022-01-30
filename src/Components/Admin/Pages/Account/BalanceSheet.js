import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';



export default function PDF(props) {// Create styles
    const styles = StyleSheet.create({
        box: {
            color:"darkblue",
            marginTop:"20px",
            fontSize:"20px",
            flexDirection: "row",
        },
        innerText:{
            borderBottom:"1px solid darkblue",
            margin:"0 auto",
            paddingLeft:"10px",
            width:"45%"
        }
    });

    // Create Document Component
    const MyDocument = () => (
        <Document>
            <Page size="A4" >
                <Header Date={props.Data.Date} />
                <ColumnHeaders />

                <ColumnDataHeaders Col1="Current assets" Col2="Current liabilities" />



            </Page>

        </Document>
    );


    return <PDFViewer style={props.style}>
        <MyDocument />
    </PDFViewer>
}

function DataRows(props) 
{
    const styles = StyleSheet.create({
        box: {
            marginTop:"20px",
            fontSize:"17px",
            flexDirection: "row",
        },
        innerText:{
            margin:"0 auto",
            paddingLeft:"10px",
            width:"45%"
        }
    });
    return <View style={styles.box}>
    <Text style={styles.innerText}>{props.Col1}</Text>
    <Text style={styles.innerText}>{props.Col2}</Text>
</View>
}

function ColumnDataHeaders(props) 
{
    const styles = StyleSheet.create({
        box: {
            marginTop:"20px",
            fontSize:"17px",
            flexDirection: "row",
        },
        innerText:{
            margin:"0 auto",
            paddingLeft:"10px",
            width:"45%"
        }
    });
    return <View style={styles.box}>
    <Text style={styles.innerText}>{props.Col1}</Text>
    <Text style={styles.innerText}>{props.Col2}</Text>
</View>
}

function ColumnHeaders()
{
    const styles = StyleSheet.create({
        box: {
            color:"darkblue",
            marginTop:"20px",
            fontSize:"20px",
            flexDirection: "row",
        },
        innerText:{
            borderBottom:"1px solid darkblue",
            margin:"0 auto",
            paddingLeft:"10px",
            width:"45%"
        }
    });
    return <View style={styles.box}>
    <Text style={styles.innerText}>Assets</Text>
    <Text style={styles.innerText}>Liabilities</Text>
</View>
}

function Header(props)
{
    const styles = StyleSheet.create({
        box:{
            padding:"10px",
            backgroundColor:"rgb(230,230,230)"
        },
        TopHeader: {
            margin: 5,
            textAlign: "center",
            fontFamily: "Helvetica-Bold"
        },
        TopHeader2: {
            margin: 5,
            textAlign: "center"
        }
    });

    return <View style={styles.box}>
        <Text style={styles.TopHeader}>Balance Sheet</Text>
        <Text style={styles.TopHeader2}>{props.Date}</Text>
    </View>
}