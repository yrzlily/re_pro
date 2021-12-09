// 传参编码
function encodeQuery(query) {
    let queryStr = ''
    let keys = Object.keys(query)
    // a=1&b=2
    keys.forEach((item, index) => {
        queryStr = index
            ? `${queryStr}&${item}=${query[item]}`
            : `${queryStr}${item}=${query[item]}`
    })
    return encodeURI(queryStr)
}

// 接收解码
function decodeQuery(queryStr) {
    let query = {}
    // 中文需解码
    queryStr = decodeURI(queryStr.replace('?', ''))
    let queryArr = queryStr.split('&')
    queryArr.forEach(item => {
        let keyAndValue = item.split('=')
        query[keyAndValue[0]] = keyAndValue[1]
    })
    return query
}

function getParentTag(list, path) {
    let vArr = []    //用来接收相关联父级id的集合
    function shellArr(obj,id){
    if(obj.length){
        obj.forEach(item => {
        if (item.children && item.children.length) {
            if (item.children.some(row => row.path === id)) {  //这里利用some筛选子级有没有符合条件的，有就重新递归，没有就继续递归
            vArr.unshift(item.path)
            //重新递归
            shellArr(list,item.path)
            }else{
            //继续递归
            shellArr(item.children, id)
            }
        }else{return}
        })
    }
    }
    shellArr(list, path);       //调用，传入a为要筛选的数组，传入b为后台返回的id值
    return vArr;
}


export {
    encodeQuery,
    decodeQuery,
    getParentTag,
};