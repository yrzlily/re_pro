import {useState, Component} from 'react'
import {Modal} from 'antd'
class open extends Component{
    constructor(){
        super();
        this.state = {
            isModalVisible: false,
        };
    }

    showModal = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    render(){
        
        const handleOk = () => {
            this.setState({
                isModalVisible: false,
            });
        };
        const handleCancel = () => {
            this.setState({
                isModalVisible: false,
            });
        };
        return(
            <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        )
    }
}

export default open