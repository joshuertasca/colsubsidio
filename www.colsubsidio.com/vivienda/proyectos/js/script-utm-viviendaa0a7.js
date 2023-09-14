try{let _utm2_=window.location.href
if(_utm2_.indexOf("utm")>-1){localStorage.setItem('_utm2_',_utm2_);}}catch(error){}
function guardar_gc_2(){let _utm_=get_utm_part()
var settings_gc={"url":"https://utm.allxposible.com/api/public/registrar-utm","method":"POST","timeout":0,"headers":{"Content-Type":"application/x-www-form-urlencoded"},"data":{"referencia":""+window.location.href,"utm_source":""+_utm_.utm_source,"utm_medium":""+_utm_.utm_medium,"utm_campaign":""+_utm_.utm_campaign,"utm_campaign_id":""+_utm_.utm_campaign_id,"utm_adset_id":""+_utm_.utm_adset_id,"utm_ad_id":""+_utm_.utm_ad_id,"formulario":""+JSON.stringify(buscarLstField())}};$.ajax(settings_gc).done(function(response){console.log(response);});}
function guardar_gc(){let _utm_=get_utm_part()
let data=""
data+="referencia="+window.location.href
data+="&utm_source="+_utm_.utm_source
data+="&utm_medium="+_utm_.utm_medium
data+="&utm_campaign="+_utm_.utm_campaign
data+="&utm_campaign_id="+_utm_.utm_campaign_id
data+="&utm_adset_id="+_utm_.utm_adset_id
data+="&utm_ad_id="+_utm_.utm_ad_id
data+="&formulario="+JSON.stringify(buscarLstField());data=encodeURI(data);var xhr=new XMLHttpRequest();xhr.withCredentials=true;xhr.addEventListener("readystatechange",function(){if(this.readyState===4){console.log(this.responseText);}});xhr.open("POST","https://utm.allxposible.com/api/public/registrar-utm");xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xhr.send(data);}
function buscarLstField(){let form_envio=document.getElementById("form_info");let inputs=new Array();try{inputs=form_envio;}catch(error){}
let lstCampos=new Array();for(let i=0;i<inputs.length;i++){if(inputs[i].value!=""&&inputs[i].name!=""){let campo=new Object();let type="";try{type=document.getElementById(inputs[i].id).type;}catch(error){}
if(type.indexOf("text")>-1||type.indexOf("number")>-1||type.indexOf("email")>-1){campo.value=inputs[i].value;}else if(type=="radio"||type=="checkbox"){if(inputs[i].checked){campo.value=inputs[i].value;}else{campo.value="";}}else if(type.indexOf("select")>-1){let e=document.getElementById(inputs[i].id);campo.value=e.options[e.selectedIndex].text;}else{campo.value="";}
campo.name=inputs[i].name;if(campo.value!=""){lstCampos.push(campo);}}}
return lstCampos}
function buscarFormularioAddField(){let _utm_=get_utm_part()
let form_envio=document.getElementById("form_info");let inputs=new Array();try{inputs=form_envio}catch(error){}
add_utm_input(form_envio,"utm_source",_utm_.utm_source)
add_utm_input(form_envio,"utm_medium",_utm_.utm_medium)
add_utm_input(form_envio,"utm_campaign",_utm_.utm_campaign)
add_utm_input(form_envio,"utm_campaign_id",_utm_.utm_campaign_id)
add_utm_input(form_envio,"utm_adset_id",_utm_.utm_adset_id)
add_utm_input(form_envio,"utm_ad_id",_utm_.utm_ad_id)
if(inputs.length>0){let btSubmit=document.getElementById("link_cotizalinea")
btSubmit.addEventListener("click",guardar_gc_2);let btSubmit1=document.getElementById("link_quierocontacten")
btSubmit1.addEventListener("click",guardar_gc_2);}}
function set_utm_form2(){let _utm_=get_utm_part()
set_utm_input2("utm_source",_utm_.utm_source)
set_utm_input2("utm_medium",_utm_.utm_medium)
set_utm_input2("utm_campaign",_utm_.utm_campaign)
set_utm_input2("utm_campaign_id",_utm_.utm_campaign_id)
set_utm_input2("utm_adset_id",_utm_.utm_adset_id)
set_utm_input2("utm_ad_id",_utm_.utm_ad_id)}
function set_utm_input2(_id_,_val_){let campo=document.getElementById(_id_);document.getElementById("span_"+campo.name).style.display="none";campo.value=_val_;}
function set_utm_form(){let _utm_=get_utm_part()
set_utm_input("input_27",_utm_.utm_source)
set_utm_input("input_28",_utm_.utm_medium)
set_utm_input("input_29",_utm_.utm_campaign)
set_utm_input("input_30",_utm_.utm_campaign_id)
set_utm_input("input_31",_utm_.utm_adset_id)
set_utm_input("input_32",_utm_.utm_ad_id)}
function set_utm_form(){let _utm_=get_utm_part()
set_utm_input("input_27",_utm_.utm_source)
set_utm_input("input_28",_utm_.utm_medium)
set_utm_input("input_29",_utm_.utm_campaign)
set_utm_input("input_30",_utm_.utm_campaign_id)
set_utm_input("input_31",_utm_.utm_adset_id)
set_utm_input("input_32",_utm_.utm_ad_id)}
function add_utm_form(_form_){let _utm_=get_utm_part()
add_utm_input(_form_,"input_27",_utm_.utm_source)
add_utm_input(_form_,"input_28",_utm_.utm_medium)
add_utm_input(_form_,"input_29",_utm_.utm_campaign)
add_utm_input(_form_,"input_30",_utm_.utm_campaign_id)
add_utm_input(_form_,"input_31",_utm_.utm_adset_id)
add_utm_input(_form_,"input_32",_utm_.utm_ad_id)}
function set_utm_input(_name_,_val_){document.getElementById("span_"+_name_).style.display="none";let element1=document.querySelector("input[name='"+_name_+"']");element1.value=_val_;}
function add_utm_input(_form_,_name_,_val_){let element1=document.createElement("input");element1.type="hidden";element1.name=_name_;element1.value=_val_;_form_.appendChild(element1);}
function get_utm_part(){let utm_source="";let utm_medium="";let utm_campaign="";let utm_campaign_id="";let utm_adset_id="";let utm_ad_id="";let utm_ad_content="";try{let res_utm2_=localStorage.getItem('_utm2_').split("?");let res_campos=res_utm2_[1].split("&");for(let index=0;index<res_campos.length;index++){let element=res_campos[index];let campo=element.split("=");if(campo[0]=="utm_source"){utm_source=campo[1];}
if(campo[0]=="utm_medium"){utm_medium=campo[1];}
if(campo[0]=="utm_campaign"){utm_campaign=campo[1];}
if(campo[0]=="utm_campaign_id"||campo[0]=="campaignid"){utm_campaign_id=campo[1];}
if(campo[0]=="utm_adset_id"||campo[0]=="adgroupid"){utm_adset_id=campo[1];}
if(campo[0]=="utm_ad_id"){utm_ad_id=campo[1];}
if(campo[0]=="utm_content"){utm_ad_content=campo[1];}}}catch(error){}
let campo_=new Object();campo_.utm_source=utm_source;campo_.utm_medium=utm_medium;campo_.utm_campaign=utm_campaign;campo_.utm_campaign_id=utm_campaign_id;campo_.utm_adset_id=utm_adset_id;campo_.utm_ad_id=utm_ad_id;campo_.utm_ad_content=utm_ad_content;return campo_;}