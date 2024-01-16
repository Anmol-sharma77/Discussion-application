const subbtn=document.getElementById("qsub");
const qinp=document.getElementById("ques");
const sinp=document.getElementById("sub");
const div2=document.getElementById("div2");
const div3=document.getElementById("div3");
var resul=document.getElementById("resid");
const divq=document.getElementById("divq");
const divs=document.getElementById("divs");
const list=document.getElementById("list");
var c=0;
getdis(function(err,dis){
    if(err){
        console.log(err);
    }
    else{
        dis=Array.from(dis);
        dis.forEach(function(d){
            addtodom(d);
        });
    }
});
subbtn.addEventListener("click",function(){
    const qval=qinp.value;
    const sval=sinp.value;
    qinp.value='';
    sinp.value='';
    var flag=0;
    var id=Math.random();
    if(qval&&sval)
    {
        savediss(qval,sval,id,flag);
    }
    else
    {
        alert('Please enter the question');
    }
});
function addtodom(ob){
    const h2 = document.createElement("h2");
    const li=document.createElement("li");
    const li2=document.createElement("li");
    const p=document.createElement("p");
    const h22 = document.getElementById("h22");
    const p2=document.getElementById("p2");
    const btn1=document.createElement("button");
    const list2=document.getElementById("dii");
    const fbtn=document.getElementById("fbtn");
    const dp=document.createElement("p");
    const search=document.getElementById("search");
    const n=document.getElementById("name");
    const ta=document.getElementById("nres");
    const span1=document.getElementById("span1")
    const span3=document.createElement('span');
    if(ob.flag===1)
    {
        span3.style.color="yellow";
    }
    else
    {
        span3.style.color="none";
    }
    btn1.setAttribute("class","btn");
    btn1.innerHTML="Resolve";
    span3.setAttribute("class","material-symbols-outlined");
    span3.innerHTML="star";
    h2.innerHTML=ob.sub;
    p.innerHTML=ob.ques;
    setInterval(function(){
    var date=Date.now();
    date-=ob.date;
    dp.style.color="grey";
    var seconds=(date/1000).toFixed();
    var minutes=(seconds/60).toFixed();
    var hours =(minutes / 60).toFixed();
    var day=(hours/24).toFixed();
    if(Number(day)!==0){
        day+=" days ago";
        dp.innerHTML=day;
    }
    else if(Number(hours)!==0){
        hours+=" Hours ago";
        dp.innerHTML=hours;
    }
    else if(Number(minutes)!=0){
        minutes+=" minutes ago";
        dp.innerHTML=minutes;
    }
    else {
            dp.innerHTML="Just Now";  
    }},10);
    h2.setAttribute("id",ob.id);
    p.setAttribute("id",ob.id);
    list.appendChild(li);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(dp);
    p.appendChild(span3);
    li.addEventListener("click",function(ev){
        if(div2.style.display=="block"){
        div2.style.display="none";
        div3.style.display="block";
        }
        const div23=document.getElementById("div23");
        const span2=document.getElementById("span2");
        const qbtn=document.createElement("button");
        span2.innerHTML="";
        resul.innerHTML='';
        qbtn.setAttribute("class","btn");
        qbtn.innerHTML="Response";
        div23.appendChild(span2);
        span2.appendChild(qbtn);
        span1.innerHTML="";
        list2.appendChild(li2);
        li2.style.border="none";
        h22.innerHTML=ob.sub;
        p2.innerHTML=ob.ques;
        li2.appendChild(h22);
        li2.appendChild(p2);
        span1.appendChild(btn1);
        var di=ob.id;
        getres(function(err,res){
            if(err)
            console.log(err);
            else{
                res=Array.from(res);
                res.forEach(function(d)
                {
                    if(d.id===di)
                    addrestodom(d);
                })
            }
        });
        btn1.addEventListener("click",function(event){
            deletedis(di);
            li.removeChild(p);
            li.removeChild(h2);
            li.removeChild(dp);
            li.style.border="none";
            resul.innerHTML='';
            div2.style.display="block";
            div3.style.display="none";
        });
        qbtn.addEventListener("click",function(event){
            var name=n.value;
            var res=ta.value;
            n.value='';
            ta.value='';
            if(!name || !res) {
                alert('Please fill all the fields');
            }else{
                saveres(name,res,ob.id);
            }
        });
    });
    fbtn.addEventListener("click",function(){
        div2.style.display="block";
        div3.style.display="none";
    });
    search.addEventListener("keyup",function(event){
            var sdata=search.value;
            if(sdata){
            searchdis(sdata,function(){});
            }
           else{
            var i=0;
            getdis(function(err,res){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.forEach(function(d){
                        list.children[i].style.display="block";
                        i++;
                    })
                }
            });
           }
    });
    span3.addEventListener("click",function(event){
        favourite(ob.id,ob.flag);
    })
}
function getdis(callback)
{
    var data=localStorage.getItem("diss")||'';
    if(data.length===0)
        {
            data="[]";
        }
    try 
    {
        data=JSON.parse(data);
        callback(null,data)
    }
    catch(err)
    {
        callback(err,[]);
    }
}
function savediss(quess,subb,idd,flag){
    var date=Date.now();
    var obj={"sub":subb,"ques":quess,"id":idd,"flag":flag,"date":date};
    getdis(function(err,dis){
        if(err)
        {
            console.log(err);
        }
        else
        {
            dis.push(obj);
            localStorage.setItem("diss",JSON.stringify(dis));
            addtodom(obj);
        }
    });
}
function deletedis(id)
{
    var data=localStorage.getItem("diss");
    var resdata=localStorage.getItem("res")||'';
    if(resdata==="")
    {
        resdata=[];
    }
    data=JSON.parse(data);
    var filterddata=[];
    filterddata=data.filter(function(d){
        return d.id!==Number(id);
    });
    resdata=JSON.parse(resdata);
    var resfilterddata=[];
     resfilterddata=resdata.filter(function(d){
        return d.id!==Number(id);
    });
    localStorage.setItem("diss",JSON.stringify(filterddata));
    localStorage.setItem("res",JSON.stringify(resfilterddata));
}
function saveres(name,resp,id)
{
    const rid=Math.random();
    var ob={"name":name,"resp":resp,"id":id,"rid":rid,"thup":0,"thdn":0};
    getres(function(err,res){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.push(ob);
            localStorage.setItem("res",JSON.stringify(res));
            addrestodom(ob);
        }
    });
}
function getres(callback)
{
    var data=localStorage.getItem("res")||'';
    if(data.length===0)
        {
            data="[]";
        }
    try 
    {
        data=JSON.parse(data);
        callback(null,data)
    }
    catch(err)
    {
        callback(err,[]);
    }
}
function addrestodom(obj)
{   
    const resli=document.createElement("li");
    const resh2=document.createElement("h2");
    const resp=document.createElement("p");
    const thspan=document.createElement("span");
    const thp=document.createElement("span");
    const thdp=document.createElement("span");
    const thdspan=document.createElement("span");
    thspan.setAttribute("class","material-symbols-outlined");
    thspan.innerHTML="thumb_up";
    thdspan.setAttribute("class","material-symbols-outlined");
    thdspan.innerHTML="thumb_down";
    getth(obj.rid,function(up,down){
        thp.innerHTML=up;
        thdp.innerHTML=down;
    });
    resh2.innerHTML=obj.name;
    resp.innerHTML=obj.resp;
    resul.appendChild(resli);
    resli.appendChild(resh2);
    resli.appendChild(resp);
    resh2.appendChild(thdspan);
    thdspan.appendChild(thdp);
    resh2.appendChild(thspan);
    thspan.appendChild(thp);
    thspan.addEventListener("click",function(event){
        event.stopImmediatePropagation();
        saveth(obj.rid,1,0);
        resul.innerHTML='';
            getres(function(err,res){
                if(err)
                console.log(err);
                else{
                    res=Array.from(res);
                    res.forEach(function(d)
                    {
                        if(d.id===obj.id)
                        addrestodom(d);
                    })
                }
            });
    });
    thdspan.addEventListener("click",function(event){
        event.stopImmediatePropagation();
        saveth(obj.rid,0,1);
        resul.innerHTML='';
            getres(function(err,res){
                if(err)
                console.log(err);
                else{
                    res=Array.from(res);
                    res.forEach(function(d)
                    {
                        if(d.id===obj.id)
                        addrestodom(d);
                    })
                }
            });
    });
}
function searchdis(dataa){
    var i=0;
    getdis(function(err,res){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.forEach(function(d){
                if(d.sub.search(dataa)>=0||d.ques.search(dataa)>=0)
                {
                    list.children[i].style.display="block";
                }
                else
                {
                    list.children[i].style.display="none";
                }
                i++;
            });
        }
    });
}
function favourite(id,flag){
    getdis(function(err,dis)
    {
        if(err)
        {console.log(err);}
        else
        {
            if(!flag){
            var filteredata=[];
            dis.forEach(function(d)
            {
                if(d.id===Number(id)||d.flag===1)
                {
                    d.flag=1;
                    filteredata.push(d);
                }
            });
            dis.forEach(function(d)
            {
                if(d.id!==Number(id)&&Number(d.flag)!==1)
                {
                    console.log(d);
                    filteredata.push(d);
                }
            });
            localStorage.setItem("diss",JSON.stringify(filteredata));
            list.innerHTML="";
            filteredata.forEach(function(d){
                addtodom(d);
            });
        }
        else{
            var filtereddata=[];
            var obj;
          dis.forEach(function(d)
            {
                if(d.flag===1&&Number(d.id)!==Number(id))
                {
                    filtereddata.push(d);
                    console.log(filtereddata);
                }
                else if(Number(d.id)===Number(id))
                {
                    d.flag=0;
                    obj=d;
                }
            });
            dis.forEach(function(d){
                if(d.flag===0)
                {
                    filtereddata.push(d);
                    console.log(filtereddata);
                }
            })
            console.log(filtereddata);
            localStorage.setItem("diss",JSON.stringify(filtereddata));
            list.innerHTML="";
            filtereddata.forEach(function(d){
                addtodom(d);
            });
        }
        }
    })
}
function getth(id,callback)
{
    getres(function(err,res){
        if(err)
        console.log(err);
        else
        {
            res.forEach(function(r){
                console.log(r,r.id,id);
                if(r.rid===id)
                {
                    callback(r.thup,r.thdn);
                    return;
                }
            });
        }
    });
}
function saveth(id,up,down)
{
    getres(function(err,res){
        if(err)
        console.log(err);
        else
        {
            var filterres=[];
            filterres=res.map(function(r){
                if(r.rid===id&&up)
                {
                    r.thup+=1;
                    return r;
                }
                else if(r.rid===id&&down)
                {
                    r.thdn+=1;
                    return r;
                }
                return r;
            });
            filterres.sort(function(x,y){
                var tx=x.thup-x.thdn;
                var ty=y.thup-y.thdn;
                if(tx>ty)
                return -1;
                else  if (tx<ty )
                return 1;
                else
                return 0;
            });
            console.log(filterres);
            localStorage.setItem("res",JSON.stringify(filterres));
        }
    });
}