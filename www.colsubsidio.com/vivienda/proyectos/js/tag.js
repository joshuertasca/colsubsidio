function tag(event,category,action,label)
{dataLayer.push({'event':event,'category':category,'action':action,'label':label,'UES':'Vivienda'});}
function tagord(event,category,action,label)
{if(label==1)
{dataLayer.push({'event':event,'category':category,'action':action,'label':'Precio de menor a mayor','UES':'Vivienda'});}
if(label==2)
{dataLayer.push({'event':event,'category':category,'action':action,'label':'Precio de mayor a menor','UES':'Vivienda'});}}
function tag1(event,category,action,label,nombreProyecto,ubicacionProyecto,precioDesde,areaDesde,tipoProyecto,Subsidio)
{dataLayer.push({'event':event,'category':category,'action':action,'label':label,'nombreProyecto':nombreProyecto,'ubicacionProyecto':ubicacionProyecto,'precioDesde':precioDesde,'areaDesde':areaDesde,'tipoProyecto':tipoProyecto,'Subsidio':Subsidio,'UES':'Vivienda'});}