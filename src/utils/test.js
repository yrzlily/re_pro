class a{
    ob_a = 1;
    ob_b = {
        a: 2,
    }
    action(){
        let {a} = this.ob_b
        console.log(a)
        return this.ob_a + 2
    }
}
let c_a = new a();
console.log(c_a.action())