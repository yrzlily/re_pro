import React, { Component } from 'react'
import { Table, Button } from 'antd';
import Open from './components/open'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
  
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class Page extends Component{
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };
    showOpen = React.createRef();

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
            selectedRowKeys: [],
            loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    openWin =() => {
        console.log(this.showOpen)
        this.showOpen.showModal()
        // this.showOpen.setState({
        //     isModalVisible: true
        // })
    }

    render(){
        const { loading, selectedRowKeys, showOpen } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return(
            <div>
                <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <Button type="primary" onClick={this.openWin} >
                    openWin
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                <Open ref={el=>this.showOpen=el} />
            </div>
        )
    }
}

export default Page;