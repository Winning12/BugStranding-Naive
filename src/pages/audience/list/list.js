import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete,Tabs } from 'antd';
import CCard from './cCard'
import UCard from './uCard'
const { TabPane } = Tabs;

export class List extends BaseComponent {

    constructor(props){
        super(props);
        this.state={
            data:1,
        }
    };

    componentWillMount(){
        var successAction = (result) => {
            if(result.status=="ok"){
                this.setState({data:result.questions})
            }else{
                this.pushNotification("danger", JSON.stringify(result));
            }
        }

        var errorAction = (result) => {
            this.pushNotification("danger", "Connection Failed");
        }
        
        this.getWithErrorAction('/question/list', successAction,errorAction);
    }

    renderUCards=()=>{
        if(this.state.data!=1)
            return(
                <TabPane tab="Under Going" key="1">
                    {this.state.data.map(this.renderUCard)}
                </TabPane>
            )
        return null
    }

    renderUCard=(item)=>{
        if(item.status==1)
            return(
                <UCard data={item}/>
            )
        else
            return null
    }

    renderCCards=()=>{
        if(this.state.data!=1)
            return(
                <TabPane tab="Completed" key="2">
                    {this.state.data.map(this.renderCCard)}
                </TabPane>
            )
        return null
    }

    renderCCard=(item)=>{
        if(item.status==2)
            return(
                <CCard data={item}/>
            )
        else
            return null
    }

    render(){
        return (
            <Row style={styles.container} >
                <Col lg={6} xs={1}/>
                <Col lg={12} xs={22}>
                    <Tabs defaultActiveKey="1" >
                        {this.renderUCards()}
                        {this.renderCCards()}
                    </Tabs>        
                </Col>
                <Col lg={6} xs={1}/>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"50px"
    }
}

