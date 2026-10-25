//$.ajaxSetup({ timeout:2000 });

const { t, create,inform, exec } = ef;
var biblejs;
var cancionesjs;

function tildes(t) {
    tea = t.replace(/a/gm, "(a|á)");tee = tea.replace(/e/gm, "(e|é)");tei = tee.replace(/i/gm, "(i|í)");teo = tei.replace(/o/gm, "(o|ó)");teu = teo.replace(/u/gm, "(u|ú)");
    tea = teu.replace(/A/gm, "(A|Á)");tee = tea.replace(/E/gm, "(E|É)");tei = tee.replace(/I/gm, "(I|Í)");teo = tei.replace(/O/gm, "(O|Ó)");teu = teo.replace(/U/gm, "(U|Ú)");
    teu = teu.replace(/ /gm, "\\s");
return teu;
}

$.get('?data=can',function (datos) {
	var canList = (typeof datos === 'string') ? JSON.parse(datos) : datos;
	if (canList && canList.length > 0) {
		$.get('/cancioneros/'+canList[0].n+".js",function (data) { cancionesjs =TAFFY(jscanciones); editform.$data.name=canList[0].n+'.js';});
	}
})

	var librosjs = TAFFY(libros);
	var favo = TAFFY();
	var his = TAFFY(); 		//his.store('historial');
	var config = TAFFY(); 
	var biblias = TAFFY();
	favo.store('favor');
	config.store('settings');	
	biblias.store('biblias');
	var imgcatch = TAFFY();
	
	//if(local == 1)
	{imgcatch.store('imgs');}

	var mican = TAFFY();		mican.store('cancionero');

	var supervar;
	var supervar2;
	var letram

if(biblias().get() == '')
{
	biblias.insert({id:1,n:'Reina Valera 1960 - RV1960',abr:'RV1960', ti: 'bi'});
}

if(config().get() == '')
{
	config.insert({neg:'1',fuente:'quicksand',arr:1,abb:40,izq:1,der:70,color1:'base',tam:1,opa:['0.5'],propia:0});
}

var inicial = config().get()[0];
var color1;

if(config().get()[0].color1 == 'base') {color1 = 'blue-grey';}
else if(config().get()[0].color1 == 'black') {color1 = 'grey';}
else {color1 = config().get()[0].color1;}





function regexlibro (c) {
resul = [];
eval("resul = librosjs({ti:{regex:/" + c + "/gim}}).get();");
return resul;
}

function jscapitulos (c) {
resul = [];
for (i = 1; i <= librosjs({i: {'==': c}}).get()[0].n; i++) {
  resul.push({c:i});
}

return resul;
}

function regexcancion (c) {
resul = [];
resul1 = [];
c= tildes(c);
eval("resul = cancionesjs({ti:{regex:/" + c + "/gim}}).order('ti asec').get();");
eval("resul1 = cancionesjs({le:{regex:/" + c + "/gim}}).order('ti asec').get();");

resul1.forEach(function (es) {
var a = resul.indexOf(es);
if (a == -1) {	
	resul.push(es);
}

})
return resul;

}

const versionbotones = new t `
>div
	%style=zoom:0.8;font-size:13px
	+list
	>br
	>div.divider.col.s12
`

const llama = new t`
>div
	%style=display:{{disp = block}}
	>div.center
		>div.responsive-img.loading
			%style=display:{{display = visible}};height:28px;
		>div
			%style=display:{{mensage = visible}};font-size:16px
			>strong
				.{{encontrado}}
			>div.divider
	+list
`

const Component = t`
>div
	>div.{{color}}-text.text-darken-4.vertit.vinculo
		@click = leercap
		%innerHTML = <i class="material-icons grey-text text-lighten-1" style="position:relative;top:6px">auto_stories</i> {{tit}} : {{cap}}:{{ver}}
	>div.grey-text.text-darken-4.resul.vinculo
		@click = leer
		%innerHTML = {{tex}}
	>div.divider
`

const capitulo = new t`
>div.caja.card-panel.style-7
	%id = leer
	>h4.s12.center.light.{{color = grey}}-text.text-darken-4.animated.fadeIn
		%innerHTML= {{tit}} {{cap}}
	>table.animated.fadeIn
		%style= font-size:18px;
		#cellpadding = 0
		#cellspacing = 0
		+list
	>div.center.{{color}}.darken-4.letrero.cajanum
		%style=position:fixed;width:80px;right:40px;border:2px solid #8F8F8F;bottom:15vh;border-radius:8px;
		>span
			%id=versionabr
		>input.center.letrero.cajanum
			%style=font-size:24px;margin:0px
			%id=versiculator
			%type=number
			%value={{valor}}
			@change = cambiav:{{valor}}
`

capitulo.$methods={

	cambiav({value})
		{
			if (value <1){value=1;}
			else if (value > capitulo.list.length){value=capitulo.list.length}
		else{
		capitulo.list[value-1].$methods.pintar()
		window.location.href="#"+value;		
		$("#versiculator").focus();
		try { $("#buscaver").val(value);}	 catch(e){}
		}
	$("#versiculator").val(value);
	}
}


const conte = t`
>tr.{{resalta}}
	>td
		%id={{v}}
		%innerHTML = {{v}}
		%style=font-weight:bold
	>td.capiversiculo
		%innerHTML = <a class="grey-text text-darken-4 vinculo" ><div>{{tex}}</div></a>
		@click = pintar
`

const capitulos = new t`
>div.row.center
	%style= font-size:15px;
	+list
	>div
		%id=histo
`

const capi = t`
>a.col.s4.m4.l2.{{color = blue-grey}}.{{colo = darken-2}}.white-text.center.light
	#style={{font}}
	@click = leer1
	%href = #
	.{{c}}
`

const biblia = new t`
>div.s6.col.tex
	>div.tex.center.{{color}}.darken-3.white-text
		.Antiguo Testamento
	+list
`

const biblialibros = t`
>div.over
	>a.{{color}}-text.text-darken-4.vinculo
		@click = leer
		>div.libro
			.{{ti}}
	>div.divider
`

const bibliant = new t`
>div.s6.col
	>div.tex.center..{{color}}.darken-3.white-text
		.Nuevo Testamento
	+list
	>div
		%innerHTML= </div></div></div>
`

//<div class="center blue-grey lighten-3">DHH</div><div class="divider"></div>
//	#style= backgroundcolor:#cfd8dc
function buscar(str){
	if(str !='')		{
  if (str.length > 3 )	{
p=$("#texto").val();
tex="proceso("+p.length+")";
setTimeout(tex,600)
}
}}

async function proceso(cant)
{
v= $("#texto").val();
if ($('#tb').is(':checked')) {  para='0'}
else if ($('#at').is(':checked')) {  para='39'}
else if ($('#nt').is(':checked')) {  para='40'}

if (v.length == cant)	{
inform();
$('#busqueda').scrollTop(0);
//var d = new Date();
//var n = d.getTime();

llama.$data.display = "visible";
llama.$data.mensage = "none";

//data = jsregex(tildes(v),para);				// consulta la Biblia, para realizar la busqueda por palabras
//data =  jsregex(tildes(v),para);


$.post('?biblia',{version:biblias().get()[0].n,buscar:tildes(v),para,tipo:biblias().get()[0].ti },function (data) {

 	llama.list = [];
if (data == null) {
llama.$data.encontrado= 'No Encontrado !';
llama.$data.display = "none";
llama.$data.mensage = "visible";
}
//var d = new Date();
//n = d.getTime() - n;

 	vez = 'vez'
if (data.length >1) {vez = 'veces'}

llama.$data.encontrado= 'Encontrado: '+ data.length + ' ' + vez;

//$('#marco').fadeIn('slow');$('#bien').fadeOut();
ocultador('marco');
//llama.$data.disp='block'; $('#bibliacompleta').hide();

	$.each (data, function (key, val ) {
	r=tildes(v);
	re = new RegExp(r, 'i');
	val.tex = val.tex.replace (/(<\S([^>]+)>)/ig,'')
	val.tex = val.tex.replace(re,function (x) {return "<span class='resaltador'>" + x + "</span>";});
	
	val.tit= libros[parseInt(val.lib)-1].ti;
	val.hre = val['ver'];
	val.color = config().get()[0].color1;
	llama.list.push(new Component({$data: val,$methods: { leer({state})
	{ 

	val.tex = val.tex.replace (/(<\S([^>]+)>)/ig,'')			// QUITA  HTML

//	cambiartexto(val['tex'],val['tit'] + ': '+val['cap'] + ':' + val['ver'],biblias().get()[0].abr); 	
	texto(val['tit'],val['lib'],val['cap'],val['ver']).then(()=>{
	//setTimeout(()=>{ 
		window.location.href="#"+val.hre;	
		//},180);
		capitulo.list[val['ver'] - 1].$methods.pintar();
	}) 
	

	cap(val['tit'],val['lib'],val['cap']);
	historial()
	
	},
	leercap({state})
	{
		texto(val['tit'],val['lib'],val['cap'],val['ver']); 
		cap(val['tit'],val['lib'],val['cap']);
		setTimeout(()=>{ window.location.href="#"+val.hre;	},180);
	}


	} }))
  });

llama.$data.display = "none";
llama.$data.mensage = "visible";


$('#concord-icon').fadeIn();

llama.$data.disp='block';
$('#bibliacompleta').hide();


llama.$mount({target: document.getElementById('busqueda')})
exec();

	},'json')	//post
}

}


function pageupdate(){
try{
	co = win.document.body.innerHTML;
	co=co.replace('?autoplay=1"></iframe>','/hqdefault.jpg"></img>');
	co=co.replace('<iframe style="height:100vh;width:100%" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" src="https://www.youtube.com/embed/','<img style="height:100vh;width:70%" src="https://i.ytimg.com/vi/');

	co= co.replace('autoplay','');
	document.getElementById('doble').contentWindow.document.body.innerHTML= co;
}
catch(err){}
}


function cambiartexto(texto,versiculo, version = '') {
		if(typeof win != "undefined")
			{
try {
	//$(win).focus();
	supervar= undefined;

if(texto == '')
{
	vista.$data.textostyle='animation: desaparecer 1.5s ease-in-out forwards;';
	
	var cookie = JSON.stringify({ 'texto': "", 'ver': "" });
	document.cookie ="texto=" + cookie;

	setTimeout(()=>{
		vista.$data.texto = ''
		vista.$data.versi = '';
		vista.$data.textostyle="display:none";
		pageupdate();
	},2000)

}

else{
	vista.$data.textostyle='animation: desaparecer 0.1s ease-in-out forwards;';
//	vista.$data.anim='fadeOut';

	setTimeout(()=>{
//		vista.$data.textostyle='display:none';
		vista.$data.texto=texto;
		vista.$data.versi = '<small>' + versiculo + '</small>'
		cookversion ='';

		if(version !='' && mostrarver.checked == true){
		vista.$data.versi +=  '<small style="opacity:0.6"> -  '+version+'</small>';
		cookversion = ' - ' + version;
		}



	var cookie = JSON.stringify({ 'texto': texto.replace(/\;/ig,"@"), 'ver': '<small>'+ versiculo + cookversion +  '</small>'});
	document.cookie ="texto=" + cookie;

		if(config().get()[0].maxtam == 1)
			{
				vista.$data.tama = 20;
			}
		else if(config().get()[0].tam == 1)
			{
				if(vista.$data.texto.length >180){ 		vista.$data.tama = 9;	}
				else if(vista.$data.texto.length >=150){ vista.$data.tama = 10;	}
				else if(vista.$data.texto.length >=100){ vista.$data.tama = 12;	}
				else if(vista.$data.texto.length >=50){vista.$data.tama = 13;	}
				else if(vista.$data.texto.length >=20){vista.$data.tama = 14;	}
				else if(vista.$data.texto.length >=1){vista.$data.tama = 16;	}
			}
	},100)

//		$.post('/?cookie',{str:cookie},(re)=>{  console.log(re);	})


setTimeout(()=>{
vista.$data.textostyle="display:visible";
//vista.$data.textostyle='opacity:1';
//vista.$data.anim='fadeIn';
letram.noUiSlider.set(vista.$data.tama);

},100)

	if(versiculo.search('<span') == -1 && local == 1)
	{
		if(mostrarver.checked == false)
				{
					version='';
				}
		texto = texto.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '' + '$2');

		$.post('/?archivotexto',{pantalla:'principal',text:texto.replace(/<[^>]*>/g, ""),ver:versiculo.trim(),versi:version.trim()},(dat)=>{
			//console.log(texto+' - '+versiculo+' - '+version);
		});
	}

}

}

catch (err) {

}
	}
	else
	{
		win=window.open("/?f=visor&t=h","visor", "type=fullWindow,width=1280,height=720,scrollbars=no,menubar=no,toolbar=no,status=no");
		setTimeout(()=>{ visor();

		cambiartexto(texto,versiculo)
		},1200);
	}
}


function cap(tit,lib,cap) {
//	inform();
versbotones();

$('#play').html('<h5 class="col s12 light center" %style=zoom:0.8;font-size:30px> Capítulos de: ' + tit  +'</h5>');

var c = [];
var i= 1
data=jscapitulos(lib);
capitulos.list = []

capitulos.$data.titulo=tit;

 	$.each(data, function( key, val ) {
capitulos.list.push(new capi({$data: val,$methods: { leer1({state})
	{	
		resaltador(val['c']);	texto(tit,lib, val['c'] ,0);
		$("#versiculator").val('');

	//$('#play').html('<div class="center"><iframe class="z-depth-2" width="60" height="73" frameborder="0" src="player.php?lib=' + lib + '&cap=' + val['c'] + '&tit=' + tit + '&t=' + $("#texto").val() +  '"></iframe><br><a onclick="$(\'#bien\').html(\'\');$(\'#marco\').fadeOut(\'fast\');$(\'#bien\').fadeIn(\'fast\');paralela('+ val['c']  + ','+ lib  + ',\''+ tit +'\');" class="btn small blue darken-3 waves-effect waves-light">Paralela <i class="material-icons right">subject</i></a></div>' + '<h5 class="center light">Capitulos de:<br>' + tit +'</h5>');
   }
	} }))
})
resaltador(cap);
historial();
capitulos.$mount({target: document.getElementById('comple')});
}



async function texto(tit,lib,cap,ver,key = 0) {
//$('#leer').scrollTop(0);
//JHIM
capitulo.$mount({target: document.getElementById('leer'),option: 'replace'});

var tip='';

try
	{
		
		bib = versionbotones.list[key].$data.title;
		abr = versionbotones.list[key].$data.abr
		tip = versionbotones.list[key].$data.t
		
		versionbotones.list.forEach((value,clave)=>{
			versionbotones.list[clave].$data.color2 = 'darken-3';
		})
		versionbotones.list[key].$data.color2 = 'darken-4';
	}
catch(e) 	{
		bib =  biblias().get()[0].n
		abr =  biblias().get()[0].abr
		tip =  biblias().get()[0].ti
		}

await $.post('?biblia',{'tipo':tip,capitulo:cap,version:bib,libro: lib},function (data) {
 	cont=1;
 	capitulo.list = []

capitulo.$data.tit= tit;
capitulo.$data.cap= cap;
capitulo.$data.color = color1;
capitulo.$data.lib=lib;

//capitulo.$data.version='<small id="versionabr" style="font-size:14px" class=" letrero left darken-3 '+color1+ '">'+biblias().get()[key].abr + "</small>";

$("#versionabr").text(abr);
	setTimeout(()=>{
		$("#versiculator").focus();
	},300);



 	$.each(data, function( tecla, val ) {

if (ver == cont) {
//				cambiartexto(val.tex,tit + ': '+cap + ':' + cont); 	

	val['v']= val.ver; 
	val['resalta']='blue-grey lighten-4 z-depth-2';
	 if((his({tit: {'==': tit},cap: {'==': cap},ver: {'==': ver},key: {'==': key}}).get()) == '')
	 {
		his.insert({tit:tit,lib:lib,cap:cap,ver:ver,tex:val.tex,key:key,version:abr,time:Math.floor(Date.now()/1000)});
		historial();
	}
}
else { val['v']= val.ver;
}

	capitulo.list.push(new conte({$data: val,$methods: { pintar()
		{
		cambiartexto(val.tex,tit + ' '  + cap + ':' + val.v , $('#versionabr').text());

	if((his({tit: {'==': tit},cap: {'==': cap},ver: {'==': val.v},key: {'==': key}}).get()) == '')
	 {
		his.insert({tit:tit,lib:lib,cap:cap,ver:val.v,tex:val.tex,key:key,version:abr,time:Math.floor(Date.now()/1000)});
		historial();
	}

	for (i = 0; i < capitulo.list.length; i++) {
		capitulo.list[i].$data.resalta="";
		}

try{
	capitulo.list[(val.v-1)].$data.resalta="blue-grey lighten-4 z-depth-2";
	$("#versiculator").focus();
	$("#versiculator").val(val.v);
}
catch(e){}

		}

	}

	
	 }))
	cont ++ ;
  });
 },'json');


exec()
}


const internet = new t`
>div.card-panel.caja.style-7.row
	%id=videop
	>div.center.z-depth-3
		%style=width:100%;height:auto;position:relative;padding:8px
		>div.row
			%style=padding:3px;
			>div.col.s12.flow-text
				.Página Web
			>div.col.s8
				>input
					%value={{paginaweb}}
					%placeholder=https://www.google.com
				>br
				>span.{{color}}.darken-4.letrero.z-depth-4.vinculo
					%style=margin:8px;padding:10px;width:7vw
					@click = quitar
					.Quitar
				>span.{{color}}.darken-1.letrero.z-depth-4.vinculo
					%style=margin:8px;padding:10px;width:7vw
					@click = poner
					.enviar
			>div.col.s1
			>div.col.s3
				>div.paginaweb
					%style=height:80px; widht:80%;border-radius: 8px;background-size: contain;background-repeat: no-repeat;
	>br
	>div.center.z-depth-3
		%style=width:100%;height:auto;position:relative;padding:8px
		>div.row
			>div.col.s12.flow-text
				.Adicionales
			>div.col.s10.row
				>div.col.s4
					>div.{{color}}.darken-4.letrero.z-depth-2.vinculo
						>i.material-icons
							%style=top:5px;position:relative;padding-right:6px
							.schedule
						%style=padding:6px;
						@click = reloj
						.Reloj
				>div.col.s4
					>div.{{color}}.darken-3.letrero.z-depth-2.vinculo
						>i.material-icons
							%style=top:5px;position:relative;padding-right:6px
							.timer
						%style=padding:6px;
						@click = cronometro
						.Cronómetro
				>div.col.s4
					>div.{{color}}.darken-2.letrero.z-depth-2.vinculo
						>i.material-icons
							%style=top:5px;position:relative;padding-right:6px
							.timelapse
						%style=padding:6px;
						@click = cuentatras
						.Regresiva
			>div.col.s2
				>div.responsive-img.htmlicon
					%style=height:140px	
`;

/*
	>div.grey.center.lighten-4.z-depth-5
		%style=width:100%;height:auto;position:relative;padding:8px
		>div.white.row
			%style=padding:16px;
			>div.col.s12.flow-text
				.Código HTML 
			>div.col.s10
				>textarea.{{color}}.lighten-5.materialize-textarea
					%style=transform:scale(0.9,0.9)
					%value={{codehtml}}
					%placeholder=<html> </html>
				>br
				>span.{{color}}.darken-4.letrero.z-depth-4.vinculo
					%style=margin:8px;padding:10px;width:7vw
					@click = quitar
					.Quitar
				>span.{{color}}.darken-2.letrero.z-depth-4.vinculo
					%style=margin:8px;padding:10px;width:7vw
					@click = codeponer
					.enviar
			>div.col.s2
				>div.responsive-img.htmlicon
					%style=height:140px
*/


function historial()
{

const historias = new t`
>div.col.s12
	%id=histo
	>div.flow-text
		.Historial
		>div.divider
	+list
`

const historia = t`
>div.s12.col.cancion.vinculo.text-darken-4.{{color}}-text
	%style=line-height:12px;padding-top:10px;
	@click = cargarhisto
	.{{tit}} {{cap}}:{{ver}} - {{version}}
	>small.grey-text.text-darken-4
		%style=text-align:justify;font-weight:normal
		. - {{tex}}
		>div.divider
`

historias.list=[];
resul = his().order('time desc').get();

$.each(resul, function(key, val ) {
	val.color= color1;
historias.list.push(new historia({$data: val,$methods: { cargarhisto({state})
{
cap(val.tit,val.lib,val.cap);
cambiartexto(val.tex,val.tit +' '+val.cap + ':' + val.ver,val.version);

texto(val.tit,val.lib,val.cap,val.ver,val.key).then(()=>{
	//capitulo.list[val.ver - 1].$methods.pintar();
	window.location.href="#"+val.ver
	$("#versiculator").val(val.ver);

})
}
	} }))

})

historias.$mount({target: document.getElementById('histo'),option: 'replace'});
}



function resaltador(num) {						//  ESTO CAMBIA DE COLOR EL FONDO GRIS CUANDO SE CAMBIA EL CAPITULO

	for (i = 0; i < capitulos.list.length; i++) {
	capitulos.list[i].$data.colo="darken-2";
	capitulos.list[i].$data.font='font-weight: normal;';
	capitulos.list[i].$data.color =	color1
	}

try{
capitulos.list[num-1].$data.colo="darken-4";
capitulos.list[num-1].$data.font='font-weight: bold;';
} 
catch(e){}
}

function searchbible()
{ $('#bibliacompleta').html('<div class="col s1"><i class="material-icons" style="margin-top:15px">search</i></div><div class="s8 col"><input type="text" id="lib" autocomplete="off" placeholder="Filtrar Libros" style="font-size:18px" onkeyup="bible(this.value)"></div><div class="col s1 vinculo" title="Borrar Filtro" onclick="$(\'#lib\').val(\'\'); $(\'#buscacap\').val(\'\'); $(\'#buscaver\').val(\'\'); bible(\'\')"> <i class="material-icons grey-text text-darken-2 grey lighten-4 z-depth-1 crece letrero" style="padding:8px;font-size:20px;">clear</i> </div>'); }

function searchcancion()
{ 
	var cod='<i class="material-icons col s1" style="margin-top:15px">search</i><input class="col s10" id="can" type="text" autocomplete="off" placeholder="Filtrar Canciones - por Titulo o Texto" onkeyup=" cancio(this.value)">';
	cod = cod + '<a href="#modal1" class="col s1"><i onclick="newletra();" style="padding:5px;font-size:25px;" class="grey-text text-darken-2 grey lighten-4 z-depth-1 crece letrero material-icons  modal-trigger" title="Añadir Nueva Canción">add</i></a>';

	$('#listacancion').html(cod);

 }


function bible(letras) {
//llama.$umount();


if(letras != ''){data = regexlibro(tildes(letras)); 
	if(data.length == 1 ){ 
		buscatexto.$mount({target: document.getElementById('bibliacompleta')});
		buscatexto.$data.ti = data[0].ti; 
		//alert(JSON.stringify(data[0]));
		buscatexto.$data.lib= data[0].i; 
		$("#buscacap").focus(); 

		$('#buscacap').val('');
		$('#buscaver').val('');
		}
	  else{
		  buscatexto.$data.ti=''
		  buscatexto.$data.cap=''
		  buscatexto.$data.ver=''
		  buscatexto.$umount();
		  $("#lib").focus();
		}
}
	else { data=libros;	buscatexto.$umount();  $("#lib").focus();}

	
biblia.list = []
bibliant.list = []

color=config().get()[0].color1;

biblia.$data.color=color;
bibliant.$data.color=color;

	$.each(data, function( key, val ) {

val.color=color;

if (val['i'] >= 40) {
	bibliant.list.push(new biblialibros({$data: val,$methods: { leer({state})
	{ cap(val['ti'],val['i'],1);texto(val['ti'],val['i'], 1,0);}
	} }))
}

else {
	biblia.list.push(new biblialibros({$data: val,$methods: { leer({state})
	{ cap(val['ti'],val['i'],1);texto(val['ti'],val['i'], 1 ,0);}
	} }))
}

})
//})


biblia.$mount({target: document.getElementById('bibliacompleta')});
bibliant.$mount({target: document.getElementById('bibliacompleta')});
exec();
}

const buscatexto = new t`
>div.col.s12.row
	%style=font-size:20px
	>span.col.s12.flow-text.center
		.{{ti}}
	>input.col.s6.center
		%style=font-size:20px;
		@keydown.10.13.39 = go
		@keydown.08.8.37 = back
		@keyup = checkcap
		%id = buscacap
		%placeholder = Capítulo
		%type = text
		%value = {{cap}}
	>input.col.s6.center
		%style=font-size:20px;
		@focus = cargar
		@keydown = cargar
		@keydown.08.8.37 = back
		@change = cargarver
		@keyup = checkcap
		%id = buscaver
		%placeholder = Versículo
		%type = number
		%value = {{ver}}
`;

buscatexto.$methods = {
		cargar ({state})
	{
		//console.log(event.keyCode)
		cap(state.$data.ti,state.$data.lib,state.$data.cap);
	},
	cargarver ({state})
	{
	if(state.$data.ver !='' && state.$data.ver >0 && state.$data.cap != '' && state.$data.cap > 0)
	 {

		
	if(capitulo.$data.cap != state.$data.cap || state.$data.lib != capitulo.$data.lib)
		{
		texto(state.$data.ti,state.$data.lib, state.$data.cap,state.$data.ver).then(()=>{
		if(state.$data.ver > capitulo.list.length ){ state.$data.ver = capitulo.list.length; $("#buscaver").val(capitulo.list.length);}
		else{
		setTimeout(()=>{ window.location.href="#"+state.$data.ver
		capitulo.list[state.$data.ver - 1].$methods.pintar()
		$("#buscaver").focus();
			},200);
		}
		})
		   
		   //JHIM
		}
		else{
		if(state.$data.ver > capitulo.list.length ){ state.$data.ver = capitulo.list.length; $("#buscaver").val(capitulo.list.length);}
			else{
			capitulo.list[state.$data.ver - 1].$methods.pintar()
				setTimeout(()=>{ window.location.href="#"+state.$data.ver;		$("#buscaver").focus(); },50);
				}
		}
	}


	},
		go ({state})
	{
		$("#buscaver").focus(); 
	},

		checkcap ({state})
	{
		if(isNaN(buscatexto.$data.cap))
		{  $("#buscacap").val(''); }

		if(isNaN(buscatexto.$data.ver))
		{  $("#buscaver").val(''); }
		

	},

	back({state})
	{

		
	//if(state.$data.ver ==''){$("#buscacap").focus();}
	if($('#buscaver').val() == ''){$("#buscacap").focus();}
	if($('#buscaver').val() == '' && $('#buscacap').val() == ''){$("#lib").focus();}

//	if(state.$data.cap =='' && state.$data.ver==''){$("#lib").focus();}

	}
}


function info()
{
var str=`
<div class='col s12'><div class='caja card-panel style-7'>
<div class="s7 col">
     <div class="light center blue-text text-darken-4 flow-text" style="font-weight: 600;">Historia de MCyMB</div>

<b>MCyMB</b> (Movimiento Cristiano y Misionero Boliviano) nació como una respuesta a la necesidad real de las congregaciones de contar con un sistema de proyección multimedia confiable, veloz y fácil de usar.
<br><br>
Durante muchos años, los equipos de multimedia e iglesias dependieron de programas complejos, pesados o de licencias costosas que dificultaban el servicio en el altar. Frente a esto, se concibió una plataforma pensada para el operador: un software donde proyectar alabanzas, versículos bíblicos con concordancia en tiempo real, anuncios dinámicos y notas pastorales no tome más de 2 clics.
<br><br>
Hoy, <b>MCyMB</b> representa la modernización integral y evolución de este proyecto: un sistema abierto, impulsado por un servidor ultraligero en Node.js, totalmente offline y portable, con arquitectura modular, desacoplamiento completo de temas (Modo Oscuro / Modo Claro independientes del color de contorno), previsualización tipográfica en vivo y persistencia garantizada en disco local.
<br><br>
	<div class="center">
	<b>MCyMB - Sistema Multimedia Cristiano y Proyección Bíblica</b><br>
	Desarrollado y modernizado por <b>Maykol Villazón Flores</b> (<a href="https://github.com/maykol-villazon-dev" target="_blank">@maykol-villazon-dev</a>)<br>
	<small style="color: #888;">Distribuido de forma libre para la edificación de las congregaciones y ministerios.</small>
	</div>
<br><br>

 <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">keyboard_arrow_right</i> <div class="light blue-text text-darken-4 flow-text">Notas del Autor</div></div>
      <div class="collapsible-body" style="font-size:15px;padding:18px;background-color:#FFF">

Esta versión de <b>MCyMB</b> ha sido reconstruida y optimizada para ofrecer una experiencia fluida, moderna y sin ataduras propietarias.<br><br>
Cada módulo fue refinado pensando en los servidores de multimedia que cada semana dedican su tiempo y talento para que la congregación adore y reciba la Palabra de Dios sin interrupciones ni fallos técnicos.
<br><br>
<strong>Mejoras y Adaptaciones en esta Versión:</strong>
<ul>
<li>*	<span class="resaltador"><b>Arquitectura Abierta en Node.js:</b></span> Migración a un servidor independiente, ultra ligero y de código abierto sin dependencias cerradas.</li>
<li>*	<span class="resaltador"><b>Modo Oscuro & Modo Claro Desacoplados:</b></span> Ahora puedes elegir libremente cualquier color de contorno (naranja, azul, verde, etc.) y el modo activo se mantiene intacto.</li>
<li>*	<span class="resaltador"><b>Selector y Previsualización de Fuentes en Vivo:</b></span> Menú con 9 fuentes optimizadas, navegación rápida (◀ / ▶) y caja de prueba tipográfica en tiempo real.</li>
<li>*	<span class="resaltador"><b>Persistencia Total de Datos:</b></span> Sincronización instantánea de canciones favoritas, notas y configuraciones en disco local (JSON y almacenamiento interno).</li>
<li>*	<span class="resaltador"><b>Motor Multimedia y Fondos en Bucle:</b></span> Soporte continuo para videos de fondo en alta resolución y banco de imágenes.</li>
<li>*	<span class="resaltador"><b>Inicio Rápido y Silencioso:</b></span> Scripts optimizados (<code>iniciar.bat</code> y modo sin consola <code>iniciar_sin_consola.vbs</code>) con detección automática de Chrome/Edge en modo app.</li>
<li>*	Corrección en concordancia de búsqueda bíblica y control completo mediante teclado.</li>
</ul>
<br>
	<div class="center negrilla">"Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres." — Colosenses 3:23</div>

	  </div>
	</li>
    <li>
      <div class="collapsible-header"><i class="material-icons">keyboard_arrow_right</i> <div class="light blue-text text-darken-4 flow-text">Información del Sistema</div></div>
      <div class="collapsible-body" style="font-size:15px;padding:18px;background-color:#FFF">
  
  <b>MCyMB</b> cuenta con las siguientes capacidades integradas:<br>
  <ul>
  <li>La Biblia Reina Valera 1960 con concordancia y búsqueda instantánea</li>	  
  <li>Más de 1000 Canciones cristianas con acordes, ritmos y favoritos</li>
  <li>Proyección en Ventana Secundaria / Pantalla Completa ("Solo Letras")</li>
  <li>Selector de 9 Fuentes Tipográficas con vista previa en vivo</li>
  <li>Filtro y edición de canciones, adición de nuevos temas y cancioneros</li>
  <li>Sección de Notas de predicación (4 paneles) y 2 Secciones de Anuncios dinámicos</li>
  <li>Control de versículos y canciones mediante teclado</li>
  <li>Soporte de fondos de imagen <b>(jpg, png, webp, gif, bmp, svg)</b></li>
  <li>Soporte de fondos de video en bucle continuo <b>(mp4, webm, ogg)</b></li>
  <li>Iluminación de fondo y márgenes de proyección configurables</li>
  <li>Reloj digital, Cronómetro y Cuenta Regresiva para cultos y actividades</li>
  <li>Servidor local rápido con respaldo automático en disco</li>
  </ul>
 </div>
    </li>

  </ul>
</div>

<div class="s5 col">
<div class="light center blue-text text-darken-4 flow-text" style="font-weight: 600;">Agradecimientos</div>
Agradezco a mi Señor <b>JESUCRISTO</b>, por la vida, la inspiración, el conocimiento y la paciencia para llevar adelante este proyecto, por ser mi fortaleza y guía en cada línea de código desarrollada.
<br><br>
Agradezco de corazón a mi familia por su apoyo incondicional y paciencia, y a los hermanos y pastores de la congregación por su constante respaldo y motivación.
<br><br>
<div class="light center blue-text text-darken-4 flow-text" style="font-weight: 600;">Créditos</div>
Reconocimiento especial al administrador de <a href="http://miconcordancia.com/" target="_blank">miconcordancia.com</a> por su cooperación inicial con la base de datos de la Biblia Reina Valera 1960.
<br><br> 
Crédito también al administrador de <a href="http://ipuccastilla.com" target="_blank">ipuccastilla.com</a> por la publicación de cancioneros incluidos en este proyecto, y a Jhim Preston por los cimientos de la versión original.
<br><br>
<b>Tecnologías y Librerías de Código Abierto:</b>
<table class="tex">
        <thead>
          <tr>
              <th>Nombre</th>
              <th>Página Web</th>
          </tr>
        </thead>
        <tbody>
			<tr>
				<td>Node.js</td>
				<td><a href="https://nodejs.org" target="_blank">https://nodejs.org</a></td>
			</tr>
          <tr>
            <td>TaffyDB</td>
            <td><a href="https://taffydb.com/" target="_blank">https://taffydb.com/</a></td>
          </tr>
          <tr>
            <td>Materialize</td>
            <td><a href="https://materializecss.com/" target="_blank"> https://materializecss.com/</a></td>
          </tr>
          <tr>
            <td>ef.js</td>
            <td><a href="https://ef.js.org/" target="_blank">https://ef.js.org</a></td>
          </tr>
          <tr>
            <td>jQuery</td>
            <td><a href="https://jquery.com/" target="_blank">https://jquery.com/</a></td>
          </tr>
          <tr>
            <td>Twemoji</td>
            <td><a href="https://www.jsdelivr.com/package/npm/twemoji" target="_blank">https://www.jsdelivr.com/package/npm/twemoji</a></td>
          </tr>
          <tr>
            <td>Animate.css</td>
            <td><a href="https://daneden.github.io/animate.css/" target="_blank">https://daneden.github.io/animate.css/</a></td>
		  </tr>
		  <tr>
		  <td>noUiSlider</td>
		  <td><a href="https://refreshless.com/nouislider/" target="_blank">https://refreshless.com/nouislider/</a></td>
		</tr>
		<tr>
		<td>SweetAlert2</td>
		<td><a href="https://sweetalert2.github.io" target="_blank">https://sweetalert2.github.io</a></td>
	     </tr>
		 <tr>
		<td>JsPanel</td>
		<td><a href="https://jspanel.de" target="_blank">https://jspanel.de</a></td>
	     </tr>
		<tr>
		<td>Moment.js</td>
		<td><a href="https://momentjs.com" target="_blank">https://momentjs.com</a></td>
		</tr>
		<tr>
		<td>JsColor</td>
		<td><a href="https://jscolor.com" target="_blank">https://jscolor.com</a></td>
		</tr>
		<tr>
		<td>Flagpedia</td>
		<td><a href="https://flagpedia.net" target="_blank">https://flagpedia.net</a></td>
	     </tr>
        </tbody>
      </table>
 </div>
</div>
</div>`;
$('#info').html(str);

	$('.collapsible').collapsible();
    $('.materialboxed').materialbox();
}

async function loadImage(fname) {
	var response = await fetch(fname);
	vista.$data.fon =  URL.createObjectURL (await response.blob());
	pageupdate()
}


async function loadvideo(fname) {
	var response = await fetch(fname);
	return 	URL.createObjectURL (await response.blob());
}


const vista = new t`
>link
	#rel=stylesheet
	#href=/css/font/{{nuevafuente = quicksand}}.css
>style
	|.marquee { overflow: hidden; white-space: nowrap; animation: marquee {{marqueevel = 60}}s linear infinite; z-index: 10;} @keyframes marquee { 0%   { left: 100% } 100% { left: {{marqueetam}}}	}
	|#textos {display: flex;justify-content: center;align-content: center;flex-direction: column;top:5px;width:99%;height:98%;position:absolute;/*word-wrap: break-word;*/  /*text-shadow: 0px 1px 3px #222, 0px 3px 0px #444, 0px 3px 5px #222, 0px 4px 20px #000;*/ 
	|text-shadow: 0px 2px 6px {{colorsombra = #224373}}, 0px 3px 5px {{colorsombra = #224373}};z-index: 10;}
>div.s12
	%style=font-family: '{{fuente = quicksand}}', sans-serif;
	%id=bod
	>div.center
		%id=page
		%style= width:100%;height:100vh;display:{{pagedisplay = none}};opacity:{{oscuridad = 0.5}}
	>div.animated.{{fade = fadeIn}}
		#style=display:{{videodisplay = none}};z-index: 1;
		>video
			%id = video 
			#preload = metadata
			#loop = {{loop = loop}}
			#autoplay
			#playsinline
			%src={{video}}
			%style=opacity:{{oscuridad = 0.5}};object-fit: {{videofit = fill}};
	>div
		%id=fondo
		#style = background-size:{{ajus = 100% 100%}};display:{{fondodisplay = block}};background-position:center;background-image:url('{{fon}}');background-repeat:no-repeat;width:100%;height:100%;opacity:{{oscuridad = 0.5}};
	>div.center.animated.{{anim = fadeIn}}
		%id=textos
		%style=text-transform:{{mayusculas = none}};color:{{colortexto = FFF}};font-size:{{tama = 12}}vh;line-height:calc(var(--addi) + {{taman}}vh);font-weight:{{negri = bold}};padding-left: {{izq}}%;padding-right: {{der}}%;padding-top: {{arr}}%;padding-bottom: {{aba}}%;{{textostyle}}
		%innerHTML = {{texto}}<br><div id="verso" style="font-size:{{tamverso = 7}}vh;margin-right:5px;position:relative;top:-0.3vh">{{versi}}</div>
	>div.black.white-text.animated.{{marqueeanim = slideInUp}}
		#style = z-index:10;position:fixed;bottom:0vh;width:100%;display:{{anunciovisible = none}};opacity:1
		>span.marquee
			%id=marquee
			#style=font-size: 6vh;position:relative;left:100%
			.{{anuncio}}
`

function visor() {
//win.focus();
win.document.head.innerHTML=`
<style>:root {	--addi: 0vh;}</style>
<link rel="stylesheet" href="`+ window.location.protocol +`//`+ window.location.host + `/material.css?f=material&t=c">
<link rel="stylesheet" href="`+ window.location.protocol +`//`+ window.location.host + `/animate.css?f=animate&t=c">
<title>Visor - Proyektor</title>
<style>
body {color:#fff; background-color:#000; overflow:hidden; } #body:-webkit-full-screen {width: 100%; height: 100%; }
 
@keyframes desaparecer {
	0% {opacity:1;}
	100% {opacity:0;}
}

#fondo
{ transition: all .8s ease-in-out;}

video {width:100%;height:100%;z-index: 1;}
</style>
`;
win.window.full = function full(){
 var elem = win.document.body;
 if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}

vista.$mount({target: win.document.body});

document.getElementById('doble').contentWindow.document.head.innerHTML= win.document.head.innerHTML
pageupdate()


vista.$data.fondodisplay='none';
vista.$data.videodisplay='inline';


if (vista.$data.fon == '' && vista.$data.fondodisplay !='none')
	{
		$(win.fondo).fadeOut(300);
		$.getJSON ('?imagenes=i', function (data ) { 
			loadImage(window.location.protocol +`//`+ window.location.host +'/'+ encodeURI(data.i));
			$(win.fondo).fadeIn(1500);
		})
	}

else
	{
		$(win.fondo).fadeOut(300);
		$.getJSON ('?imagenes=v', function (data) { 

			var puerto = '';
			if (local==1){puerto = ':' + (window.location.port || 7777);}
				
			if(config().get()[0].fondo != undefined && config().get()[0].fondot == 'v')
			{
				vista.$data.video =  window.location.protocol + config().get()[0].fondo;
				$(win.fondo).fadeOut(1500,()=>{
				vista.$data.videodisplay='inline';
				$(win.video).fadeIn(1500);
				})
			}

			else if(config().get()[0].fondot =='i')
			{
			loadImage(window.location.protocol +config().get()[0].fondo);
			$(win.video).fadeOut(80,function () {
				vista.$data.fondodisplay='visible';
				$(win.fondo).fadeIn(800,() => {pageupdate();}); 
			})
			}

			else{vista.$data.video = window.location.protocol +`//`+ window.location.hostname+ puerto +'/'+ encodeURI(data.i); $(win.video).fadeIn(1500);}
		})
	}


	win.onkeyup = function() {
	var f;
	try {vi=win.document.getElementById('video').play();}catch(e){}

try{	f=vista.$data.versi.search(/autorizar/i) }
catch(e){}

		if(f != -1 )
		
			{
				alerta();
				vista.$data.versi = ''; 	
				pageupdate()
			}
	}
	win.onclick = win.onkeyup;
	setTimeout(() => {pageupdate()}, 100); 

}

const fondos = new t`
>div.row.animated.fadeIn
	+list
`
const panel =  new t`
>div.row.animated.fadeIn
	+list
`
const  imag =  t`
>div.col.s4.m3.l2.vinculo
	%style=min-width:115px
	>div.card
		%style=background-color:#F8F8F8;
		>div.card-image
			@click = cambiarimg
			>img.responsive-img.imag.{{class}}
				#draggable = false
				#style= height:auto;max-height:115px;min-height:115px;
				#data-bgimg={{tum}}
				%id=lazy{{id}}
				%src=/base.jpg?f=base&&t=jp
		>span.truncate.{{titleshow = hide}}
			%style=font-size:13px
			.{{tt}}
`
const  pdficon =  t`
>div.col.s4.m3.l2.vinculo
	%style=min-width:115px
	>div
		>div.card-image
			@click = cambiarpdf
			>div.responsive-img.pdficon
				#style= height:115px;max-height:115px;min-height:115px;position:relative;margin-top:5px
				#title={{tt}}
		>span.truncate.{{titleshow = hide}}
			%style=position:relative;padding:5px;font-size:13px
			.{{tt}}
`

const  vide =  t`
>div.col.s4.m3.l2
	%style=min-width:115px
	>div.card.vinculo.animated.fadeIn
		%style=background-color:#F8F8F8;
		>div.card-image
			%style=max-height:115px;min-height:115px;
			@click = cambiarvide
			>video.responsive-video.imag
				#preload = metadata
				#style= width:100%;background-color:#000;max-height: 115px; min-height: 115px;
				#src={{i}}
		>img.vinculo.vide
			%src=/?f=player&&t=p
			%title= Enviar a Reproductor de Video
			%style=position:absolute;left:10px;bottom:{{botom = 5}}px;zoom:0.6
			@click=videoplay
		>span.truncate.{{titleshow = hide}}
			%style=font-size:13px
			.{{tt}}
`

const indice =  t`
>div.col.s4.m3.l2.vinculo
	%style=min-width:115px
	>div.card.animated.fadeIn
		%style=background-color:#F8F8F8;
		>div.card-image
			@click = cambiarvideo
			>img.responsive-img.imag.lazy
				#draggable = false
				#style= max-height:115px;min-height:115px;
				#data-bgimg={{tum}}
				%src=/base.jpg?f=base&&t=jp
				#title={{tt}}
		>img.vinculo.vide
			%src=/?f=player&&t=p
			%title= Enviar a Reproductor de Video
			%style=position:absolute;left:10px;bottom:{{botom = 5}}px;zoom:0.6
			@click=videoplay
		>span.truncate.{{titleshow = hide}}
			%style=font-size:13px
			.{{tt}}
`

const carpeta =  t`
>div.col.s4.m3.l2.vinculo
	%style=min-width:115px
	>div
		>div.center
			@click = cambiarcarpeta
			>img.responsive-img.imag
				#draggable = false
				#style= height:auto;max-height:98px;min-height:70px;filter:{{styl}}
				%src=?f=diricon&&t=p
				#title={{tt}}
			>br
			>span.truncate
				%style=font-size:13px
				.{{tt}}
`

carpeta.$methods = {
cambiarcarpeta({state}){

	if(state.$data.e != null)
	{
			cambiarfondo(state.$data.e);
	}
	else{
			cambiarfondo(state.$data.i);
	}
	}
}



const carpetavolver =  t`
>div.col.s4.m3.l2.vinculo
	%style=min-width: 115px; max-height: 115px; min-height: 115px;
	>div
		>div.center
			@click = cambiarcarpeta
			>img.responsive-img.imag
				#draggable = false
				#style= height:auto;max-height:98px;min-height:70px;filter:{{styl}} saturate(0.8) 
				%src=?f=diricona&&t=p
				#title={{tt}}
`

const  dirs =  new t`
>div
	>div.{{color}}.lighten-1.center.{{medios = vinculo}}.col.s6.waves-effect.waves-light.white-text.truncate
		@click = tempo
		%style=padding:6px;
		>i.material-icons.right
			.folder_open
		.Cargar Medios
	>div.{{color}}.lighten-1.center.vinculo.col.s6.waves-effect.waves-light.white-text.truncate
		@click = interimag
		%style=padding:6px;
		>i.material-icons.right
			.cloud_queue
		.Imagen de Internet
	>div.{{color}}.darken-2.center.vinculo.col.s6.waves-effect.waves-light.white-text
		@click = pexels
		%style=height:55px;
		>img
			%style=top:8px;filter:grayscale(1)
			%src=/pexels.png?f=pexels&&t=p
	>div.{{color}}.darken-3.center.vinculo.col.s6.waves-effect.waves-light.white-text
		@click = unsplash
		%style=height:55px;
		>img
			%style=top:12px
			%src=/unspl.png?f=unspl&&t=p
	>div.{{color}}.darken-4.vinculo.center.col.s6.waves-effect.waves-light.white-text.truncate
		%style=padding:6px;
		@click = click
		>i.material-icons.right
			.{{ajuste = vrpano}}
		.{{titulo= Ajuste Estirado}}
	>div.black.vinculo.center.col.s6.waves-effect.waves-light.white-text.truncate
		%style=padding:6px;
		@click = afuera
		>i.material-icons.right
			.apps
		.Ventana Externa
	>div.{{color}}-text.text-darken-2.flow-text.center
		.Directorios
		>div.col.s2.right.vinculo
			@click = nombrearchivos
			#title = Mostar Nombre de Archivo
			>i.material-icons.white-text.lighten-1.grey.z-depth-1
				%style=position:relative;top:3px
				.spellcheck
	>div.divider
	+list
`;

dirs.$methods = {

click({state}){
	if( state.$data.ajuste == 'vrpano'){
		state.$data.ajuste='panorama_vertical';
		state.$data.titulo='No Estirar';
		vista.$data.ajus='contain';
		vista.$data.videofit = 'contain';
		pageupdate();
	}
	else{
		state.$data.ajuste='vrpano';
		state.$data.titulo='Ajuste Estirado';
		vista.$data.ajus='100% 100%';
		vista.$data.videofit = 'fill';
		pageupdate();
		}
},

 tempo({state})
{
//	$("#backgro").html("<div class='center loading responsive-img' style='height:60px;width:100%'></div>");
/*	$.getJSON("?imagenes=t",function (data){
		cambiarfondo(data,'enc');
	});
*/

if( dirs.$data.medios != "vinculo")
{
	return;
}

var medios = {
    maximizedMargin: 5,
    dragit: { snap: true },
    syncMargins: true,
    id: 'medios',
    theme:       'dark',
    headerTitle: 'Cargar Medios',
    position:    'right-center',
    contentSize: '900 600',
    content:     '<div id="fileDropZone" style="width:100%;height:100%;overflow:auto"><div class="z-depth-3 center" style="background-color:#E7EAEE"><img style="height:50px;" src="/?f=arrastra&amp;t=g" draggable="false"></div>'
	+'<div id="preview" class="padding-top:6px;"></div></div>',
    callback: function () {
	this.content.style.padding = '0px';
	dirs.$data.medios="";
	
panel.$mount({target: document.getElementById('preview')})
//panel.list =[]

    function drop(event) {
        var fileList = event.dataTransfer.files;
		handleFiles(fileList);
		event.preventDefault();

     }
    function dragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    var dropZone = document.getElementById("fileDropZone");
		dropZone.addEventListener("dragover", dragOver, false);
		dropZone.addEventListener("drop"    , drop    , false);

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
	var tipo;

    var file = files[i];
    var imageType = /image.*/;
	var video = /video.*/;
	var pdf = /.*pdf.*/;


		if (!file.type.match(imageType) && !file.type.match(video) && !file.type.match(pdf)) {
			continue;
			}

		else if (file.type.match(imageType))
		{ tipo= 'img';  }

	else if (file.type.match(video))
	{	tipo = 'video'; }

	else if (file.type.match(pdf))
	{	tipo = 'pdf'; }


	var val = []
//    var reader = new FileReader();
//    reader.onload = (function(aImg) { return function(e) {

		/*
		val.tum=e.target.result; 
		val.i=e.target.result;
*/

		val.tum = URL.createObjectURL(file)
		val.tt = file.name;
		val.i= val.tum;
		val.titleshow = 'show';
		val.botom = '45'

/*
	if( config().get()[0].titleshow == 1)
		{
			val.titleshow = 'show'
			val.botom = '45'
		}
*/

if(tipo == 'img')		{val.class = 'lazy'; panel.list.push(new imag({$data: val,$methods : fondos.$methods})); }
if(tipo == 'video')		panel.list.push(new vide({$data: val,$methods: fondos.$methods }))
if(tipo == 'pdf')		{panel.list.push(new pdficon({$data: val,$methods: fondos.$methods })) }


  		$('.lazy').bglazyload(); 

//		}; })(val);
//    	reader.readAsDataURL(file);

  }	// FOR
	    
		$(".jsPanel-content").scroll(function(){	$('.lazy').bglazyload(); 		});
}

    
	},onbeforeclose: function () {

			dirs.$data.medios="vinculo";
//		var storedData = jsPanel.layout.save({ selector: '.jsPanel-standard', storagename: 'mypanels'});  //guardando posicion
			return true;
	}
};

try{ var conso= jsPanel.layout.restoreId({ id: 'medios', config: medios,  storagename: 'mypanels' });  

	if(conso== undefined){
		jsPanel.create(medios);
	}

 }  //abriendo posicion guardada
catch(e){jsPanel.create(medios);   }   // crear panel si no lo encuentra

},

interimag({state})
{
try{ 	$(win.page).html(''); 	vista.$data.pagedisplay='none';}
catch(err){toast({type:"error",title:"Abre la ventana del Visor"}); }




	(async function getUrl () {
		const {value: url} = await Swal({
		  input: 'url',
		  title:'Pegue la URL de la Imagen',
		  inputPlaceholder: 'Enter the URL',
		  showCancelButton:  true
		})
		
		if (url) {

if (vista.$data.videodisplay !='none') 
{
	loadImage( "/?imagenes=g&get="+window.btoa(url)).then( function(){
		$(win.video).fadeOut(300,function() {
			vista.$data.videodisplay='none';
			vista.$data.fondodisplay='block-inline';

		$(win.fondo).fadeOut(1);
		$(win.fondo).fadeIn(1500,() => {pageupdate();}); 
	})

}) 
}
else{
	loadImage( "/?imagenes=g&get="+window.btoa(url));
	$(win.fondo).fadeOut(1600,function () {
		$(win.fondo).fadeIn(800,() => {pageupdate();}); 
	})

}
}
		})()

},

unsplash({state})
{
	(async function getUrl () {
		const {value: url} = await Swal({
		  input: 'text',
		  html:'<h5>Una o varias palabras separadas por coma<small><br>palabras en Ingles dan mejores resultados<br>Debes Tener Internet</small></h5>',
		  inputPlaceholder: 'lake',
  		  showCancelButton:  true
		})
		
		if (url) {
		cambiarfondo(url,'uns');
		}
				})();
},

pexels({state})
{
	(async function getUrl () {
		const {value: url} = await Swal({
		  input: 'text',
		  html:'<h5>Una o varias palabras separadas por coma<small><br>palabras en Ingles dan mejores resultados<br>Debes Tener Internet</small></h5>',
		  inputPlaceholder: 'lake',
		  showCancelButton:  true
		})
		
		if (url) {
		cambiarfondo(url,'pex');
		}
				})();
},

nombrearchivos()
{
		if( config().get()[0].titleshow == 1)
		{
				config().update({titleshow:0})
				fondos.list.forEach((value,key)=>{
					fondos.list[key].$data.botom='5';
					fondos.list[key].$data.titleshow='hide';
				})
		}
		else
		{
				config().update({titleshow:1});

				fondos.list.forEach((value,key)=>{
					fondos.list[key].$data.titleshow='show';
					fondos.list[key].$data.botom='45';
				})
		}
},

afuera({state})
  {
if(dirs.$data.afue == 1)
{
		fondos.$mount({target: document.getElementById('fondojs')});
		return;	
}

		var afuer = {
	maximizedMargin: 5,
    dragit: { snap: true },
    syncMargins: true,
		id:	'afuera',
		theme:       'black',
		headerTitle: 'Imagenes',
    position:    'right-center ',
    contentSize: '800 500',
    content:  '<div id="fondojs"></div>',		callback: function () {
			$(".jsPanel-content").scroll(function(){	$('.lazy').bglazyload(); });
			dirs.$data.afue = 1;

		setTimeout(()=>{
			fondos.$mount({target: document.getElementById('fondojs')});
		$("#backgro").html('<h5 class="center light"><i class="material-icons" style="font-size:50px">photo_camera</i><br>Las Imágenes están en la Ventana Externa</h5>');
			},400);

 	},onbeforeclose: function () {

			setTimeout(()=>{
				$("#backgro").html('');
			fondos.$mount({target: document.getElementById('backgro')});
			},400);

			dirs.$data.afue = 0;

//	var storedData = jsPanel.layout.save({ selector: '.jsPanel-standard', storagename: 'afuera'});  //guardando posicion
			return true;
		}
	};

try{ var conso =	jsPanel.layout.restoreId({ id: 'afuera', config: afuer,  storagename: 'afuera' });  
	if(conso== undefined){
		jsPanel.create(afuer);
	}
}  //abriendo posicion guardada
catch(e){jsPanel.create(afuer); }   // crear panel si no lo encuentra
}

}

const  directorio =  t`
>div.over.vinculo.cancion.{{color}}-text.text-darken-4.truncate
	%style=padding-left:10px;
	@click=entrar
	.{{n}}
	>i.material-icons.{{color}}-text.right
	>div.divider
`;

indice.$methods = {
cambiarvideo({state})	{
try {
	$(win.page).html('');
	vista.$data.pagedisplay='none';


		vista.$data.fondodisplay='none';
		vista.$data.loop='loop';

	if (state.$data.i.search(/blob/) == -1){
//		vista.$data.video = URL.createObjectURL(state.$data.i);
		loadvideo(state.$data.i).then((res)=>{
			$(win.fondo).fadeOut(300);
			$(win.video).fadeOut(300,function () {
				vista.$data.video = res;
				state.$data.i = res;
				vista.$data.videodisplay='inline';
				$(win.video).fadeIn(800);
				pageupdate();
			})
		})
	}

	else {$(win.fondo).fadeOut(300);$(win.video).fadeOut(300,function () {vista.$data.video = state.$data.i;vista.$data.videodisplay='inline';$(win.video).fadeIn(800); }); }

}

catch (err) {
win=window.open("/?f=visor&t=h","visor", "type=fullWindow,width=1280,height=720,scrollbars=no,menubar=no,toolbar=no,status=no");
	setTimeout(()=>{ visor();
			$(win.fondo).fadeOut(300);
			$(win.video).fadeOut(300,function () { 
			vista.$data.video = /*"http://"+window.location.host +'/'+ */ state.$data.i;
			vista.$data.loop='loop';
		});
	},1200);
	}

setTimeout(() => {pageupdate()}, 1000);
config().update({fondo: state.$data.url,fondot:'v'})
},

videoplay({state})
	{
	videoplayer()
		player.$data.inner = '<div class="row truncate" style="padding:10px;">'+state.$data.tt+'<br><i onclick="togglePlay()" style="font-size:50px;width:15%" class="left material-icons vinculo" id="botonplay">pause_circle_outline</i>'+
		'<div class="right" style="width:75%;left:-30px;" id="range"  onchange="goto(this.value)"/></div><div id="time" class="s12 col center flow-text"></div></div>';
		vista.$data.fondodisplay='none';
		vista.$data.videodisplay='inline';
		vista.$data.loop='';

	if (state.$data.i.search(/blob/) == -1){
//		vista.$data.video = URL.createObjectURL(state.$data.i);
		loadvideo(state.$data.i).then((res)=>{ 
			vista.$data.video = res;
			state.$data.i = res;

			pageupdate();
		})
	}
	else {vista.$data.video = state.$data.i;}

	try{
	$(win.video).fadeIn(1500);}
	catch(err){toast({type:"error",title:"No esta abierta la ventana del Visor"}); }

	vista.$data.loop='';
	videoElement=win.video;
	videoElement.onseeking = function() {   seek = 1;}
	videoElement.onseeked= function() { seek = 0; console.log(videoElement.currentTime)}

	videoElement.ontimeupdate = function(){barra();time.innerHTML=tiempo(videoElement.currentTime) + ' / ' +tiempo(videoElement.duration)}

	try{
	dura = document.getElementById('range');
	noUiSlider.create(dura, {
	start: 0,
	step: 0.01,
	connect: [true, false],
	orientation: 'horizontal', // 'horizontal' or 'vertical'
	range: {
	'min': 0,
	'max': 1
	}
	});

	dura.noUiSlider.on('slide', function(values,handle) 
	{
		goto(values);
	})

	}

	catch(err){}


	function barra()
	{ 	if(seek != 1) 	{ 	dura.noUiSlider.set((videoElement.currentTime / videoElement.duration)); } }

	ocultador('videoplayer');
	pageupdate();
	}
	
}


fondos.$methods = {
cambiarimg({state})
	{

		try {
			$(win.page).html('');
			vista.$data.pagedisplay='none';

			if (vista.$data.videodisplay !='none') 
			{
				$(win.video).fadeOut(300,function() {
			vista.$data.videodisplay='none';
			vista.$data.video='';
			vista.$data.fondodisplay='visible';

				})
			}

	if (state.$data.i.search(/blob:/) == -1){
			loadImage(state.$data.i).then(()=>{
			})

	}
	else
	{
		vista.$data.fon = state.$data.i;
	}

		}
		catch(err){toast({type:"error",title:"Abre la ventana del Visor"}); }
	config().update({fondo: state.$data.url,fondot:'i'})
  },

cambiarvide({state})	{
try {
	$(win.page).html('');
	vista.$data.pagedisplay='none';

	$(win.fondo).fadeOut(300);
		vista.$data.fondodisplay='none';
		vista.$data.videodisplay='inline';
		vista.$data.loop='loop';

	if (state.$data.i.search(/blob/) == -1){
//		vista.$data.video = URL.createObjectURL(state.$data.i);

		loadvideo(state.$data.i).then((res)=>{ 
			$(win.fondo).fadeOut(300);
			$(win.video).fadeOut(300,function () {
				vista.$data.video = res;
				state.$data.i = res;
				vista.$data.videodisplay='inline';
				$(win.video).fadeIn(800);
				pageupdate();
			})
		})

	}
else {$(win.fondo).fadeOut(300);$(win.video).fadeOut(300,function () {vista.$data.video = state.$data.i;vista.$data.videodisplay='inline';$(win.video).fadeIn(800); }); }


}

catch (err) {
win=window.open("/?f=visor&t=h","visor", "type=fullWindow,width=1280,height=720,scrollbars=no,menubar=no,toolbar=no,status=no");
setTimeout(()=>{ visor();
	
	$(win.fondo).fadeOut(300);
	$(win.video).fadeOut(300,function () { 
		vista.$data.video = /*"http://"+window.location.host +'/'+ */ state.$data.i;
	});
},1200);
	}
$(win.video).fadeIn(800);
setTimeout(() => {pageupdate()}, 1000); 
config().update({fondo: state.$data.url,fondot:'v'})
}
,

  	cambiarpdf({state})
  {
try {
//	$(win.page).html('');
//	vista.$data.pagedisplay='none';

	if (state.$data.i.search(/blob:/) == -1){
//	url = "//"+window.location.host +'/'+state.$data.i
	url = window.location.protocol + state.$data.i;
	}

	else
	{
	url = state.$data.i;
	}

console.log(url);

	if (vista.$data.videodisplay !='none') 
	{
		$(win.video).fadeOut(300,function() {
			$(win.page).html('<iframe style="height:100vh;width:100%" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src="'+url+'"></iframe>');
			vista.$data.pagedisplay='block';
			$(win.textos).hide();
			}) 
	}
	else{ $(win.fondo).fadeOut(300,function () {
	$(win.page).html('<iframe style="height:100vh;width:100%" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src="'+url+'"></iframe>');
	vista.$data.pagedisplay='block';
	$(win.textos).hide();
	})
 	}
	setTimeout(() => {pageupdate()}, 500);
}

catch(err){toast({type:"error",title:"Abre la ventana del Visor"}); }
  },

videoplay({state})
	{
	videoplayer()
		player.$data.inner = '<div class="row truncate" style="padding:10px;">'+state.$data.tt+'<br><i onclick="togglePlay()" style="font-size:50px;width:15%" class="left material-icons vinculo" id="botonplay">pause_circle_outline</i>'+
		'<div class="right" style="width:80%" id="range"  onchange="goto(this.value)"/></div><div id="time" class="s12 col center flow-text"></div></div>';
		vista.$data.fondodisplay='none';
		vista.$data.videodisplay='inline';
		vista.$data.loop='';

	if (state.$data.i.search(/blob/) == -1){
//		vista.$data.video = URL.createObjectURL(state.$data.i);
		loadvideo(state.$data.i).then((res)=>{ 
			vista.$data.video = res;
			state.$data.i = res;

			pageupdate();
		})
	}
	else {vista.$data.video = state.$data.i;}

	try{
	$(win.video).fadeIn(1500);}
	catch(err){toast({type:"error",title:"No esta abierta la ventana del Visor"}); }
	vista.$data.loop='';
	videoElement=win.video;
	videoElement.onseeking = function() {   seek = 1;}
	videoElement.onseeked= function() { seek = 0; console.log(videoElement.currentTime)}

	videoElement.ontimeupdate = function(){barra();time.innerHTML=tiempo(videoElement.currentTime) + ' / ' +tiempo(videoElement.duration)}

	try{
	dura = document.getElementById('range');
	noUiSlider.create(dura, {
	start: 0,
	step: 0.01,
	connect: [true, false],
	orientation: 'horizontal', // 'horizontal' or 'vertical'
	range: {
	'min': 0,
	'max': 1
	}
	});

	dura.noUiSlider.on('slide', function(values,handle) 
	{
		goto(values);
	})

	}

	catch(err){}


	function barra()
	{ 	if(seek != 1) 	{ 	dura.noUiSlider.set((videoElement.currentTime / videoElement.duration)); } }

	ocultador('videoplayer');
	pageupdate();
	}

}


function cambiarfondo(di , loca = 'l'){

$("#backgro").html('');
fondos.list = [];
//var cont= 0;
var puerto;
//var imgs = '';


var _p = window.location.port || 7777;
if(local == 1 ){ puerto = [_p,_p,_p,_p,_p,_p,_p,_p,_p,_p]; /*imgs = '';  imgs = "?img="; */ }
else if (window.location.protocol == 'https:'){puerto = [443,443,443,443];}
else{ puerto = [_p,_p,_p,_p]; }

var conta = 0

	$.getJSON('?imagenes='+loca+'&l='+di, function(data) {




//var parte = di.replace("?img=",'');

parte =  di.split('/');

if(parte.length >= 4 )
{
var datos = [];

//console.log(parte);
parte.pop();
datos.e = parte.join('/');

//console.log(datos);
	datos.styl = document.querySelector('#logocentro').style.filter + ' drop-shadow(2px 4px 3px #555)';

fondos.list.push(new carpetavolver({$data: datos,$methods : carpeta.$methods}))
}

if(data == "")
{
	toast({ type: 'info',title: 'No hay Contenido Aquí'});
//	$("#backgro").html($("#backgro").html() +'<h5 class="center light"><i class="material-icons" style="font-size:50px">grid_off</i><br>No se han encontrado resultados</h5>');
}


var conta =0;
var timeo = 1000;
var retardo = 25;
var aumento = 30;
var cajas = 0;
var filadeseis = 0;
var sep;
var imgs = ''

	$.each(data, function(key, val ) {

	if( config().get()[0].titleshow == 1)
		{
			val.titleshow = 'show'
			val.botom = '45'
		}

if (val.m != 'd'){ 
	imgs = "?img="; 
	}

if(local == 1 ){ sep = ':'+ puerto[conta]}   else{ sep = ''; imgs = ''; }		//

	if (val.i.search(/\.\./) != -1)
	{
		if(local == 1 ){	nombe = encodeURI(val.i.substr(val.i.lastIndexOf('/')+1)); 	}
		else{	nombe= '';}

		crudo = val.i;
		val.i = '//' + window.location.hostname + sep+ "/" + nombe +imgs + encodeURI(val.i); //val.i.replace(val.tt,encodeURI(val.tt));
		conta ++;
		if ( conta >9)  	{conta = 0;}
	}


 if(val.m == 'i')
{
	if(val.tum == undefined)
		{  val.tum = val.i; val.url= val.i;	}
		
		val.id=key;
		fondos.list.push(new imag({$data: val,$methods : fondos.$methods}))
	setTimeout( ()=>{
		$('#lazy'+key).bglazyload();
	},retardo)


retardo = retardo + aumento;
if(retardo >= timeo) {retardo=0;}

}

 //PDF
else if(val.m == 'p')
{
	fondos.list.push(new pdficon({$data: val,$methods: fondos.$methods}))
}
///
else if(val.m == 'v')
{

if (val.s != 0)
{//	console.log(crudo);

//	if (local==1)	{  	sep= ':7777'; }


		if(imgcatch({c: {'==': val.s}}).get() == '')
		{

	$.get(crudo.substr(0, crudo.lastIndexOf('/'))+'/indice.n/?c='+val.s,
	(re)=>{
		if(re == 'true')
			{
				imgcatch.insert({c:val.s});
				val.tum = '//' + window.location.hostname + sep  + "/"  + crudo.substr(0, crudo.lastIndexOf('/'))+'/indice.n/'+val.s+'.jpg?f='+val.s;
				fondos.list.push(new indice({$data: val,$methods : indice.$methods}))
			}

		else{											// SI NO EXISTE EN EL INDICE
				val.url= val.i;
				fondos.list.push(new vide({$data: val,$methods: fondos.$methods }))
			}

			setTimeout( ()=>{
				$('.lazy').bglazyload();
			},retardo)

retardo = retardo + aumento;
if(retardo >= timeo) {retardo=0;}

		})
		}
		else
		{
				val.tum = '//' + window.location.hostname + sep  + "/"  + crudo.substr(0, crudo.lastIndexOf('/'))+'/indice.n/'+val.s+'.jpg?f='+val.s;
				fondos.list.push(new indice({$data: val,$methods : indice.$methods}))
			setTimeout( ()=>{
				$('.lazy').bglazyload();
			},retardo)

retardo = retardo + aumento;
if(retardo >= timeo) {retardo=0;}

		}
}

		else{										//  SI NO EXITE EL INDICE
				val.url= val.i;
//				loadvideo(val.i).then((res)=>{ 
//				fondos.list[key].$data.i=res;
//				})
					fondos.list.push(new vide({$data: val,$methods: fondos.$methods }))
//		setTimeout( ()=>{
					$('.lazy').bglazyload();
//				},retardo)			
retardo = retardo + aumento;
if(retardo >= timeo) {retardo=0;}
			}

}

else if(val.m == 'd')
{

	{
		val.i= val.i.split('/');
		
		val.i.shift();
		val.i.shift();
		val.i.shift();
		
		val.i = val.i.join('/');
	}

	val.styl = document.querySelector('#logocentro').style.filter + ' drop-shadow(2px 4px 3px #555)';
	fondos.list.push(new carpeta({$data: val,$methods:carpeta.$methods}) );
}

	})
$('.lazy').bglazyload();
})
fondos.$mount({target: document.getElementById('backgro')});
}

var dura;


function dire(op)
{

dirs.list = [];
//$('#backgro').html('');
	$.getJSON('?imagenes=dirs', function(data) {
	$.each(data, function(key, val ) {
	val.color=config().get()[0].color1;	
	//val.n = val.n
dirs.list.push(new directorio({$data: val,$methods: { entrar({state})
	{
		cambiarfondo('../fondos/'+val.n);
			if(dirs.$data.afue == 1)
			{
			  setTimeout(()=>{
				fondos.$mount({target: document.getElementById('fondojs')});
	$("#backgro").html('<h5 class="center light"><i class="material-icons" style="font-size:50px">photo_camera</i><br>Las Imagenes estan en la Ventana Externa</h5>');
				},400);
			}
	}
  }
}))
})

dirs.$data.color = config().get()[0].color1;

if(dirs.$data.color == 'base') {dirs.$data.color='blue-grey'}
if(dirs.$data.color =='black') {dirs.$data.color = 'grey';}


dirs.$mount({target: document.getElementById('listafondos')})
if(op ==0) {cambiarfondo('../fondos/'+dirs.list[0].$data.n);}

})
}


const cancion = new t`
>div.s12.col.tex
	>div.s5.col
		>select.browser-default.col.blue-grey.lighten-5
			%style=height:30px;
			%id=tonosearch
			%title= Filtrar por Tono
			@change = buscatono
			>option
				%value = Tono
				.Tono
			>option
				%value = C
				.C
			>option
				%value = D
				.D
			>option
				%value = E
				.E
			>option
				%value = F
				.F
			>option
				%value = G
				.G
			>option
				%value = A
				.A
			>option
				%value = B
				.B
			>option
				%value = Cm
				.Cm
			>option
				%value = Dm
				.Dm
			>option
				%value = Em
				.Em
			>option
				%value = Fm
				.Fm
			>option
				%value = Gm
				.Gm
			>option
				%value = Am
				.Am
			>option
				%value = Bm
				.Bm
	>div.col.s5
		>select.browser-default.blue-grey.lighten-5
			%style=height:30px;
			%title= Filtrar por Estilo
			%id=estilosearch
			@change = buscaestilo
			>option
				.Estilo
				%value = Estilo
			>option
				%value = 0
				.Alabanza
			>option
				%value = 1
				.Adoración
			>option
				%value = 2
				.Coro
			>option
				%value = 3
				.Himno
	>div.col.s2.grey.lighten-3.center.vinculo.waves-effect.waves-light.letrero.z-depth-1
		@click=borrarfiltro
		%style=height:30px
		%title= Borrar Filtro
		>i.material-icons.blue-grey-text
			%style=padding:3px
			.cancel
	>div.s12.col.tex
		%style=margin-top:10px;
		>div.center.{{color}}.darken-3.white-text.col.s6
			.Canciones
		>div.center.{{color}}.darken-3.white-text.col.s2
			.Tono
		>div.center.{{color}}.darken-3.white-text.col.s4
			.Estilo
		+list
`

cancion.$methods = {

buscatono({state})
{
	if ($("#tonosearch").val() != 'Tono') {
	$('#can').val('');

	if ($("#estilosearch").val() != 'Estilo') {
	canciones('',$("#tonosearch").val(),$("#estilosearch").val());
	}
else { 	canciones('',$("#tonosearch").val()); }
	}
	

},

buscaestilo({state})
{
	if ($("#estilosearch").val() != 'Estilo') {
	$('#can').val('');
	if ($("#tonosearch").val() != 'Tono') {
		canciones('',$("#tonosearch").val(),$("#estilosearch").val());
	}
	
	else {
		canciones('','',$("#estilosearch").val());
		}
	}
},

borrarfiltro(){
canciones('');
	$("#tonosearch").val('Tono'); 
	$("#estilosearch").val('Estilo');
 	$('#can').val('');
}


}



const listacanciones = t`
>div.col.s12.cancion
	>a.{{color}}-text.text-darken-4.vinculo
		@click = cargarcancion
		>div.col.s6.truncate
			%style = text-transform: capitalize;
			.{{ti}}
		>div.col.s2.center
			.{{tono}}
		>div.col.s4.center
			%style = text-transform: capitalize;
			.{{est}}
`

const letra = new t`
>div.center
	>div
		%style=zoom:0.8;font-size:30px
		>a.col.s3.waves-effect.waves-light.btn.modal-trigger.{{color}}.darken-3.white-text.center
			#onclick=editletra();
			%href= #modal1
			%innerHTML= <i class="material-icons prefix" style="font-size:25px">edit</i>
			%title= Editar Canción 
		>a.col.s3.waves-effect.waves-light.btn.modal-trigger.{{color}}.darken-2.white-text.left
			@click=favorit
			%innerHTML= <i class="material-icons prefix" style="font-size:25px">star_border</i>
			%title= Añadir a Favoritos
		>a.col.s3.waves-effect.waves-light.btn.modal-trigger.{{color}}.darken-1.white-text
			@click = saltodelineacancion
			%innerHTML= <i class="material-icons prefix" style="font-size:25px">{{saltoicon = view_headline}}</i>
			%title= Ver Con Salto de Linea
		>a.col.s3.waves-effect.waves-light.btn.modal-trigger.{{color}}.white-text.right
			#onclick=borrarcancion();
			%href= #modal1
			%innerHTML= <i class="material-icons prefix" style="font-size:25px">delete</i>
			%title= Borrar Cancion
	>div.s12.light.{{color}}-text.text-darken-4.flow-text
		%style = text-transform: capitalize;
		.{{ti}}
	>input.{{color}}.darken-4.center.letrero.cajanum
		%style=position:fixed;width:60px;font-size:24px;border:2px solid #8F8F8F;bottom:20vh;border-radius:8px;
		%id=estrof
		%type=number
		%value={{valor}}
		@change = cambiaestrof:{{valor}}
	+list
`

letra.$methods = {
cambiaestrof({value})
{

		if (value <1){value=1;}
		else if (value > letra.list.length){value=letra.list.length}
else{
letra.list[value-1].$methods.word()
}
$("#estrof").val(value);
window.location.href="#"+value
$("#estrof").focus();
},

favorit()
{ if((favo({id: {'==': letra.$data.id},cancionero: {'==': editform.$data.name}}).get()) == ''){
	favo.insert({ti:letra.$data.ti,id:letra.$data.id,c:colorcancionero,cancionero:editform.$data.name});
	bookmark(); }
},
saltodelineacancion()
{
	if(letra.$data.saltoicon == 'grading')
	{
		letra.$data.saltoicon = 'view_headline'
		config().update({saltodelinea:0})
		letra.list.forEach((value,key)=>{

			var str = value.$data.le
			var regex = /<br[^>]*>/gi;
			letra.list[key].$data.le = str.replace(regex, "");

		})
	}

else
	{  
		config().update({saltodelinea:1})
		letra.list.forEach((value,key)=>{
			letra.list[key].$data.le = nl2br(value.$data.le);
		})
		letra.$data.saltoicon = 'grading' 
	}
}
}

const editform = new t`	
>div.row.grey.lighten-4
	>input.blue-grey.lighten-5.col.s12
		%id=titu
		%placeholder=Nuevo Titulo
		{{id}}
		%style=font-size:20px;text-transform: capitalize;
		%type=text
		%value= {{ti}}
	>textarea.blue-grey.lighten-5.col.m8
		%id=edittext
		#spellcheck= true
		%placeholder=Letra
		%style=height:45vh
		%value={{le}}
	>div.s4.col.center
		.Tono
		>select.browser-default.blue-grey.lighten-5
			%id=tono
			>option
				%value = C
				.C
			>option
				%value = D
				.D
			>option
				%value = E
				.E
			>option
				%value = F
				.F
			>option
				%value = G
				.G
			>option
				%value = A
				.A
			>option
				%value = B
				.B
			>option
				%value = Cm
				.Cm
			>option
				%value = Dm
				.Dm
			>option
				%value = Em
				.Em
			>option
				%value = Fm
				.Fm
			>option
				%value = Gm
				.Gm
			>option
				%value = Am
				.Am
			>option
				%value = Bm
				.Bm
		.Estilo
		>select.browser-default.blue-grey.lighten-5
			%id=estilo
			>option
				%value = 0
				.Alabanza
			>option
				%value = 1
				.Adoración
			>option
				%value = 2
				.Coro
			>option
				%value = 3
				.Himno
		>div.{{visible = hide}}
			>br
			>br
			.Buscar en:
		>img.card.hoverable.col.vinculo.offset-s3.s5.{{visible = hide}}
			@click = click
			%style=padding:10px;border-radius:16px
			%src=/letras.gif?f=letras&&t=g
`;


function editletra() {

editform.$data.visible='hide';
	
$('#contenido').html('');
$('#guardar').hide();
$('#actualizar').fadeIn();


editform.$mount({target: document.getElementById('contenido')});


editform.$data = {
id: letra.$data.id,
ti: letra.$data.ti,
tono: letra.$data.tono,
estilo: letra.$data.estilo,
le:  letra.$data.cancion
};

setTimeout(()=>{
$('#edittext').val(letra.$data.cancion);
$('#titu').val(letra.$data.ti);

},100);

//editform.$data.tono  letra.$data.tono
editform.$methods = {

actualizarletra()	{
editform.$data.tono = $('#tono').val();
editform.$data.estilo = $('#estilo').val();


if(local==0 && editform.$data.name == "Mi Cancionero.js")
	{
	cancionesjs({id: {'==': editform.$data.id}}).update({le:editform.$data.le,ti:editform.$data.ti,tono:editform.$data.tono,estilo:editform.$data.estilo});

try{
	mican({id: {'==': editform.$data.id}}).update({le:editform.$data.le,ti:editform.$data.ti,tono:editform.$data.tono,estilo:editform.$data.estilo});
}
catch(e){console.log(e)}

	letras(editform.$data.id,editform.$data.ti, editform.$data.le);
	canciones($('#can').val());
	$('.modal').modal('close');
	toast({ type: 'success',title: 'Canción Actualizada Correctamente'});
	}

	else if(local== 0)
	{
		$('.modal').modal('close');
		toast({ type: 'error',title: 'Solo puedes editarlo en la versión local NO en la versión en Línea.'});
	}

	else if(local==1){
 
	$.post('?data',editform.$data,function (datos) {
	cancionesjs({id: {'==': editform.$data.id}}).update({le:editform.$data.le,ti:editform.$data.ti,tono:editform.$data.tono,estilo:editform.$data.estilo});
	letras(editform.$data.id,editform.$data.ti, editform.$data.le);
	canciones($('#can').val());
	$('.modal').modal('close');
	toast({ type: 'success',title: 'Canción Actualizada Correctamente'});
	});
	}
}
}

$('#tono').val(letra.$data.tono);
$('#estilo').val(letra.$data.estilo);
}


function newletra() {

if(local==0 && editform.$data.name != "Mi Cancionero.js")
{
   	$('.modal').modal('close');
Swal({
	type:'info',
	title: '',
	html: '<h5 class="light">Solo Puedes Editar los Cancioneros en la Verión Local, NO en La Versión en Línea</h5>',
	allowOutsideClick: false,
	footer: 'Para crear nuevas canciones descarga la version Portable',
	allowEscapeKey: true
  }).then((result) => {
  	$('.modal').modal('close');
  })
}

editform.$umount();
$('#contenido').html('');
$('#guardar').fadeIn();
$('#actualizar').hide();

editform.$data.visible='show';

editform.$data = {
id: 'newcancion',
ti: '',
tono: 'C',
estilo: '0',
le: ''
};


setTimeout(()=>{
$('#edittext').val('');
$('#titu').val('');
},100);

editform.$methods = {

paso2(tit,pag)
	{
		editform.$data.ti = tit;
	$.post('/?letras',{'paso2':pag},(letr)=>{
		//$("#edittext").val(letr);
		editform.$data.le ='';
		editform.$data.le = letr;
		toast({title:'Importación Exitosa',type:'success'});
		})
	},


click()
{
	(async function getUrl () {
		const {value: url} = await Swal({
		  input: 'text',
//  		  title:'',
		  html:'<h5>Escriba el título de la Canción o parte de la Letra</h5>',
//		  inputPlaceholder: '',
  		  showCancelButton:  true
		})
		
		if (url) {
	Swal({
//		title: '<h5 class="light">Resultados</h5>',
		html: '<div class="col s12 container collection animated fadeIn show" id="resletras"><div class="loading center responsive-img" style="width:100%;height:60px"></div></div>',
		allowOutsideClick: false,
		allowEscapeKey: false,
		onBeforeOpen: () => {
		//Swal.showLoading()
		$.post('/?letras',{buscar:url},(datos)=>{
		arr=[];		
	datos.forEach(element => {

let remplazo = element.ti.replace(/(\')/g," ");
		arr.push(
	'<a class="collection-item vinculo row text-darken-4 over blue-grey-text" style="padding: 4px;" onclick="editform.$methods.paso2(\''+remplazo+'\',\''+element.u+'\')">'+
	'<div class="col s10">'+element.ti+
	'<br><small class="grey-text text-darken-1">'+element.des+'</small></div><div class="col s2"><img style="width:60px;height:60px" src="'+element.im+'"></div></a>');
	});
		$("#resletras").html(arr);
	},'json')
	}
	})



		}
				})();
},

	nuevacancion()	{
editform.$data.tono = $('#tono').val();
editform.$data.estilo = $('#estilo').val();

if (editform.$data.ti != '' && editform.$data.le != '') {


	if(local==0 && editform.$data.name == "Mi Cancionero.js")
	{

		if (mican().get() == ''){datos=1;}
		else{
				datos = mican().get()[mican().get().length-1].id +1   // OBTIENE EL ULTIMO ID Y LE SUMA 1
			}

			cancionesjs.insert({le:editform.$data.le,ti:editform.$data.ti,id:datos,tono:editform.$data.tono,estilo:editform.$data.estilo});
			mican.insert({le:editform.$data.le,ti:editform.$data.ti,id:datos,tono:editform.$data.tono,estilo:editform.$data.estilo});
			letras(datos,editform.$data.ti, editform.$data.le);
			canciones($('#can').val());
			$('.modal').modal('close');
			toast({ type: 'success',title: 'Canción Añadida Correctamente'});
	}
	else{

	$.post('?data',editform.$data,function (datos) {
cancionesjs.insert({le:editform.$data.le,ti:editform.$data.ti,id:datos,tono:editform.$data.tono,estilo:editform.$data.estilo});

	letras(datos,editform.$data.ti, editform.$data.le);
	canciones($('#can').val());
	$('.modal').modal('close');
	toast({ type: 'success',title: 'Canción Añadida Correctamente'});
	});
	}
}
 
else { toast({ type: 'error',title: 'Faltan datos por Llenar'}); }
 
	}
}

editform.$mount({target: document.getElementById('contenido')});
$('#tono').val(editform.$data.tono);
$('#estilo').val(editform.$data.estilo);
}

function borrarcancion() {
str = `
<div class="center" style="margin-top:10vh;">
<h4 class="light center">Desea borrar esta canción?</h4>
<i style="font-size:60px" class="material-icons red-text text-darken-4">delete</i><br><br>
<a class="btn blue-grey darken-4" onclick="$('.modal').modal('close');$('#cerrar').fadeIn('slow');">Cancelar</a>
<a class="btn blue darken-4" onclick="borracan(letra.$data.id)">Borrar</a>
</div>
`;

$('#cerrar').hide();
$('#guardar').hide();
$('#actualizar').hide();
$('#contenido').html(str);
}


function borracan(id) {

	if(local == 0 && editform.$data.name == "Mi Cancionero.js")
	{
		 cancionesjs({id: {'==': id}}).remove();
try{	       mican({id: {'==': id}}).remove();}
catch (e){ console.log(e);}

		favo({id: {'==': id}}).remove();
		bookmark();
		letra.$umount();
		canciones($('#can').val());
		$('.modal').modal('close');
		$('#cerrar').show();
	}
else
	{
		$.post('?data',{borrar:id,name:editform.$data.name},function (datos) {
			cancionesjs({id: {'==': id}}).remove();
		favo({id: {'==': id}}).remove();
		bookmark();

		letra.$umount();
		canciones($('#can').val());
		$('.modal').modal('close');
		$('#cerrar').show();
		})
	}
}


const estrofa = t`
>div.vinculo.{{color}}
	%style=display:table;width:100%
	%id={{estro}}
	@click = word
	>div.negrilla.numestro
		.{{estro}}
	>div.estrofa
		%innerHTML = {{le}}
	>div.divider
`


const favoritos = new t`
>div.style-7
	%style=height:50%;overflow-y:auto;zoom:0.96
	>div.center.s12.flow-text.grey-text.text-darken-4.center.blue-grey.lighten-5
		.Favoritos
		>div.divider
	+list
`

const favorito =  t`
>div.col.s12.cancion.animated.fadeIn
	>div.col.s10.{{color}}-text.text-darken-4.vinculo.truncate
		%style = text-transform: capitalize;
		.{{ti}}
		@click=cargarcancion
	>div.col.s2.vinculo
		>i.material-icons
			%style= color:#{{c}};opacity:0.8;filter:grayscale(60%)
			.delete_forever
		@click=remove
`

const cancioner = new t`
>div.style-7
	%style=height:50%;overflow-y:auto;zoom:0.98
	>div.flow-text.grey-text.text-darken-4.center.blue-grey.lighten-5
		.Cancioneros
	>div.divider
	+list
`;

const cancione =  t`
>div.vinculo.cancion.lighten-4.grey-text.col.s12.text-darken-4.letrero.truncate.{{ton}}
	%style = {{style}}
	@click = cargarcancionero
	>span
		#style = padding-right:8px;font-size:14px
		>img
			#style= width:25px;position:relative;top:2px
			%src=/?f=cancionero&&t=p
	.{{n}}
`;


var colorcancionero;


function cancioneros()
{

function cancionerocolor()
{
	cancioner.list.forEach(function(item,index) {
	if((item.$data.n + '.js') == editform.$data.name) {cancioner.list[index].$data.ton = 'blue-grey'; colorcancionero  = cancioner.list[index].$data.c;}
	else {cancioner.list[index].$data.ton = '';}
	})
}

	$.get('/?data=can',function (datos) {
	cancioner.list = [];
	/*	if(local == 0)				//PENDIENTE MI CANCIONERO
			{
				var virtual = [];
				virtual.c='FF0000';
				virtual.n='Mi Cancionero';
				virtual.style='font-weight:bold;font-variant: petite-caps;'
				cancioner.list.push(new cancione({$data: virtual,$methods: { cargarcancionero({state}){
					editform.$data.name=virtual.n + '.js';
					cancionesjs =TAFFY(mican().get()); 
					canciones($("#can").val());
					complemento='ón';

					cancionerocolor();
				if (cancion.list.length > 1) { complemento ='ones';}
				toast({ type: 'success',title: '<h5>'+ cancion.list.length+ ' Canci'+complemento+'</h5>'});

				} } }))
			}
*/
		$.each(datos, function(key, val ) {
			cancioner.list.push(new cancione({$data: val,$methods: { cargarcancionero({state})
		{
			$.get("cancioneros/"+val.n+".js?" + Math.random(),function (data) { 
				cancionesjs =TAFFY(jscanciones); 
				editform.$data.name=val.n+".js";
				cancionerocolor();
				canciones($("#can").val());
				complemento='ón';
				
				if (cancion.list.length > 1) { complemento ='ones';}
				toast({ type: 'success',title: '<h5>'+ cancion.list.length+ ' Canci'+complemento+'</h5>'});
				
				})
		}

	}}));

		})

cancionerocolor();
	},'json')


	cancioner.$mount({target: document.getElementById('favoritos')});
}



function bookmark() {

resul = favo().get();
favoritos.list = [];
	$.each(resul, function(key, val ) { 	 
		//val.c= colorcancionero;
		val.color=config().get()[0].color1;



		favoritos.list.push(new favorito({$data: val,$methods: { cargarcancion({state})
	{

	if(local==0 && val.cancionero == "Mi Cancionero.js")
		{
		cancionesjs =TAFFY(mican().get()); 

		editform.$data.name=val.cancionero;
		cancioneros();
		canciones($("#can").val());
//		toast({ type: 'info',title: '<h6>Revisa si se ha cambiado el cancionero</h6>'});
		cancionesjs({id: {'==': val.id}}).each(function (r)
		{
			letra.$data.tono = r.tono
			letra.$data.estilo = r.estilo
			letras(r.id,r.ti,r.le)
		});




		}
else{
		$.get("cancioneros/"+val.cancionero,function (data) {
		
		cancionesjs =TAFFY(jscanciones); 
		editform.$data.name=val.cancionero;
		cancioneros();
		canciones($("#can").val());
//		toast({ type: 'info',title: '<h6>Revisa si se ha cambiado el cancionero</h6>'});
		cancionesjs({id: {'==': val.id}}).each(function (r)
		{
			letra.$data.tono = r.tono
			letra.$data.estilo = r.estilo
			letras(r.id,r.ti,r.le)
		});

		})
}
	},
	
	remove({state})
	{
	favo({id: {'==': val.id}}).remove();
	bookmark();
	}	
	}}))

})
favoritos.$mount({target: document.getElementById('favoritos')});
cancioneros();
}

function cancio(can)
{
	try{
	setTimeout(()=>{
		p=$("#can").val();
		
		if (p.length == can.length)
		 {
			canciones(can);
		 }
		},400)
	 
	} catch(e){}
}


function canciones(can, ton = '',est = ''){
//cancion.$umount();
if(can != ''){$("#tonosearch").val('Tono');	$("#estilosearch").val('Estilo');data=regexcancion(can);}
else if(ton != '' && can == '' && est== ''){  data=cancionesjs({tono: {'==': ton}}).order('ti asec').get();}
else if(est != '' && can == '' && ton != ''){  data=cancionesjs({estilo: {'==': est},tono: {'==': ton}}).order('ti asec').get();}
else if(est != '' && can == '' ){  data=cancionesjs({estilo: {'==': est}}).order('ti asec').get();}


else {
var resul = [];
cont=0;
resul = cancionesjs().order('ti logical').get();
data=resul; 
 }
exec();
cancion.list = [];

color = config().get()[0].color1;
cancion.$data.color = color;

	$.each(data, function(key, val ) { 	
	val.color= color
		if (val.estilo == 1) 
		{ val.est='Adoración'; }
	
		else if (val.estilo == 2) 
		{ val.est='Coro'; }

		else if (val.estilo == 3) 
		{ val.est='Himno'; }

	else {val.est='Alabanza';}

	if (val.tono =='') {val.tono=' . '}
	cancion.list.push(new listacanciones({$data: val,$methods: { cargarcancion({state})
	{
	letra.$data.tono = val.tono
	letra.$data.estilo = val.estilo
	letras(val.id,state.$data.ti,val.le)
	setTimeout(()=>{
	$("#estrof").val('1');
	$("#estrof").focus();
	},50)	

	}}
	
	 }))  })
cancion.$mount({target: document.getElementById('listacancion')})

}


function letras(id,titulo,let){

$('#cancion').html('');
letra.list = [];
letra.$data.ti = titulo
letra.$data.cancion = let;
letra.$data.id = id

data=[];

let = let.split("\n\n");
var cont = 0;


let.forEach(function (es) {
data[cont] = { "le":es }
cont++; 
});

if( config().get()[0].saltodelinea == 0)
	{letra.$data.saltoicon = 'view_headline';}

else
	{letra.$data.saltoicon = 'grading';}

	$.each(data, function(key, val ) {

	if( config().get()[0].saltodelinea == 1)
		{ 	val.le=nl2br(val.le);	}		// SALTO DE LINEA 
	//var	te=val.le;
	val.estro = key+1;

		letra.list.push(new estrofa({$data: val,$methods: { word()  
		{

	for (i = 0; i < letra.list.length; i++) {
		letra.list[i].$data.color="";
		}

try{
	letra.list[key].$data.color="grey lighten-3 ";
	$("#estrof").focus();
	$("#estrof").val(key + 1);
//	alert(val.le)
}
catch(e){}
	cambiartexto(letra.list[key].$data.le,' ');
		}}
	}))
})


if(config().get()[0].color1 == 'black') letra.$data.color = 'grey'
else if(config().get()[0].color1 == 'base') letra.$data.color = 'blue-grey'

else	letra.$data.color = config().get()[0].color1;

letra.$mount({target: document.getElementById('cancion')})

}

const nota =  `
>div.center.animated.fadeIn
	>h5.s12.light.{{color}}-text.text-darken-4
		.Notas
	>div.s10.col
		>textarea.materialize-textarea.grey.lighten-4
			%id = {{a}}
			#spellcheck= true
			#onkeyup = notaset('{{a}}') 
	>span.{{color}}.col.s2.white-text.vinculo.btn.letrero.darken-3.waves-effect.waves-light
		.Enviar
		#onclick =cambiartexto(nl2br({{a}}.value),'')
	>br
	>br
	>div.s10.col
		>textarea.materialize-textarea.grey.lighten-4
			%id = {{b}}
			#spellcheck= true
			#onkeyup = notaset('{{b}}') 
	>span.{{color}}.col.s2.white-text.vinculo.btn.letrero.darken-3.waves-effect.waves-light
		.Enviar
		#onclick =cambiartexto(nl2br({{b}}.value),'')
	>br
	>br
	>h5.col.s12.light.{{color}}-text.text-darken-4
		.Anuncios
	>div.col.s12
		>div.s10.col
			>textarea.grey.lighten-4.materialize-textarea
				#spellcheck= true
				#rows = 5
				%id = {{d}}
				%placeholder = Texto
				#onkeyup = notaset('{{d}}')
			>div.col.s8.offset-s2.flow-text.{{hide}}
				>small
					.Completar el Recorrido en:
					>span
						%id=velo
				>div
					%id=marq
		>span.{{color}}.col.s2.white-text.vinculo.btn.letrero.darken-4.waves-effect.waves-light
			.Enviar
			#onclick = vista.$data.anuncio= {{d}}.value;vista.$data.anunciovisible= 'block';vista.$data.marqueetam= '-' + $(win.marquee).innerWidth() + 'px';vista.$data.marqueeanim = 'slideInUp';pageupdate();document.cookie = \'marquee=\' + JSON.stringify({ \'texto\': vista.$data.anuncio.replace(/\;/ig,\'@\'), \'tam\': vista.$data.marqueetam});if (config().get()[0].maxtam == 1){letram.noUiSlider.set(24);} if(config().get()[0].tam ==1){letram.noUiSlider.set(parseFloat(vista.$data.tama + 1.5));}
		>br
		>br
		>span.{{color}}.col.s2.white-text.vinculo.btn.letrero.darken-2.waves-effect.waves-light
			.Borrar
			#onclick = vista.$data.marqueeanim = 'flipOutY';setTimeout(()=>{try{vista.$data.anuncio='';vista.$data.anunciovisible= 'none';} catch(e){} },1000);pageupdate(); document.cookie = \'marquee=\' + JSON.stringify({ \'texto\': \'\', \'tam\': \'\'});
`


function notas() {

	const nota1 = create(nota);
	const nota2 = create(nota);
	$('#notascol1').html('');
	$('#notascol2').html('');

$color = config().get()[0].color1;
if($color == 'base') $color = 'blue-grey'


new nota1({$data:{'a':'nota1','b':'nota2','d':'anuncio1',color:$color}}).$mount({target: document.getElementById('notascol1')})
new nota2({$data:{'a':'nota3','b':'nota4','d':'anuncio2',color:$color,hide:'hide'}}).$mount({target: document.getElementById('notascol2')})

notaget('nota1');
notaget('nota2');
notaget('nota3');
notaget('nota4');
notaget('anuncio1');
notaget('anuncio2');

  var ma = document.getElementById('marq');
  noUiSlider.create(ma, {
   start: 40,
   step: 1,
   orientation: 'horizontal', // 'horizontal' or 'vertical'
   range: {
     'min': 15,
     'max': 90
   }
  });

ma.noUiSlider.on('update', function( values, handle ) { 
$('#velo').text(values + ' Seg');
//nota1.$data.velo = values;
vista.$data.marqueevel = values;
});


}

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
//    var breakTag = '&nbsp;&nbsp;&nbsp;&nbsp;';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	
}


function notaset(obj)
{ 	localStorage.setItem(obj, document.getElementById(obj).value); }

function notaget(obj)
{document.getElementById(obj).innerHTML = localStorage.getItem(obj);}

setTimeout(()=>{
	letram = document.getElementById('letr');
	noUiSlider.create(letram, {
	 start: vista.$data.tama,
	 step: 0.01,
	 orientation: 'horizontal', // 'horizontal' or 'vertical'
	 range: {
	   'min': 3,
	   'max': 24
	 }
	});


  letram.noUiSlider.on('update', function(values,handle) 
  {
 	
		vista.$data.tama = values;
if(config().get()[0].tam >= 0)
	{
		try{
			
			if(vista.$data.tama >= 4)
	if(vista.$data.tama  >= 14 )
	{vista.$data.tamverso = vista.$data.tama - 4;}
		else
		vista.$data.tamverso = vista.$data.tama

		}catch(e){}
	}

	  vista.$data.taman = (parseFloat(values) +0.2);
	  $('#letra').text(values);

		if(typeof win != "undefined")
			{
			try {
				var max = (win.innerHeight * 20) / 100;

				if(vista.$data.anunciovisible =='block' && config().get()[0].maxtam == 1 && (parseFloat(values) > 4 ) )
				{
					max = (win.innerHeight * 21) / 100;
					vista.$data.tama =	[vista.$data.tama - 1.2 +''];
					vista.$data.taman =	vista.$data.taman - 1
				  
				  $('#letra').text(Number.parseFloat(vista.$data.tama).toFixed(2));
				}

//				var max = 93;
//				console.log((win.innerHeight - win.verso.offsetTop));
					if( (win.innerHeight - win.verso.offsetTop) < max || win.verso.offsetTop >  win.innerHeight)  { 
///					if((win.innerHeight - win.verso.offsetTop) > 135)  { 
					vista.$data.textostyle="display:none";
					//$(win.textos).hide();
					tama =vista.$data.tama - 0.3;
//					console.log((win.innerHeight - win.verso.offsetTop) + ' / ' + max)
					vista.$data.textostyle="display:visible";
					letram.noUiSlider.set(tama);

//					alert(win.innerHeight - win.verso.offsetTop);
				}
			}
		catch(err) { win=window.open("/?f=visor&t=h","visor", "type=fullWindow,width=1280,height=720,scrollbars=no,menubar=no,toolbar=no,status=no"); setTimeout(()=>{ visor();},1200);	setTimeout(()=>{pageupdate();},1000) }
		}
		else
		{
			 // win=window.open("","visor", "type=fullWindow,width=1280,height=720,scrollbars=no,menubar=no,toolbar=no,status=no");visor();	setTimeout(()=>{pageupdate();},800) 
		}
	  pageupdate()
	});

},500)


function barras()
{

  var opa = document.getElementById('opa');
  noUiSlider.create(opa, {
   start: vista.$data.oscuridad,
   step: 0.01,
   orientation: 'horizontal', // 'horizontal' or 'vertical'
   range: {
     'min': 0.01,
     'max': 1
   }
  });


  var izq = document.getElementById('marg-izq');
  noUiSlider.create(izq, {
   start: 1,
   step: 1,
   orientation: 'horizontal', // 'horizontal' or 'vertical'
   range: {
     'min': 1,
     'max': 70
   }
  });

  izq.noUiSlider.on('update', function( values, handle ) { 
	if(vista.$data.izq != '') { config().update({izq:values}); }
	vista.$data.izq = values;
	$('#izq').text(parseInt (values) + '%');
	});

  var arr = document.getElementById('marg-arr');
  noUiSlider.create(arr, {
   start: 1,
   step: 1,
   orientation: 'vertical', // 'horizontal' or 'vertical'
   range: {
     'min': 1,
     'max': 40
   }
  });

  arr.noUiSlider.on('update', function( values, handle ) { 
	  if(vista.$data.arr != '') { config().update({arr:values}); }
	vista.$data.arr = values;
	$('#arr').text(parseInt (values) + '%');
	});

	var aba = document.getElementById('marg-aba');
	noUiSlider.create(aba, {
	 start: 40,
	 step: 1,
	 orientation: 'vertical', // 'horizontal' or 'vertical'
	 range: {
	   'min': 1,
	   'max': 40
	 }
	});
  
	aba.noUiSlider.on('update', function( values, handle ) { 
		valor = (41 - values)
		if(vista.$data.aba != '') { config().update({aba:values}); }
		vista.$data.aba = valor;
	  $('#aba').text(parseInt (valor) + '%');
	  });


	var der = document.getElementById('marg-der');
	noUiSlider.create(der, {
	 start: 70,
	 step: 1,
	 orientation: 'horizontal', // 'horizontal' or 'vertical'
	 range: {
	   'min': 1,
	   'max': 70
	 }
	});
  
	der.noUiSlider.on('update', function( values, handle ) { 
		valor = (71 - values)
		if(vista.$data.der != '') { config().update({der:values}); }
		vista.$data.der = valor;
	  $('#der').text(parseInt (valor) + '%');
	  });
  
opa.noUiSlider.on('update', function( values, handle ) {
			
			//OPAVIDEO

if (vista.$data.fondodisplay != 'none') {
	vista.$data.videodisplay = 'none'; 
}

vista.$data.oscuridad = values;

$('#ilum').text(parseInt (values*100) + '%');
});

opa.noUiSlider.on('slide', function( values, handle ) { 
	setTimeout(() => {pageupdate()}, 500); 
	config().update({opa:values})
})


		if(config().get()[0].opa)		// SI Existe Opacidad
		{		opa.noUiSlider.set(config().get()[0].opa); }


$('#negrilla').change(function(){
    if($(this).is(':checked')) {
		vista.$data.negri = 'bold';
		config().update({neg:1})
    } else {
		vista.$data.negri = 'normal';
		config().update({neg:0})		
    }
	pageupdate();
	if (typeof actualizarVistaPreviaFuente === 'function') {
		actualizarVistaPreviaFuente();
	}
});

if(config().get()[0].neg == 0)
{
	negrilla.checked = false;
	vista.$data.negri = 'normal';
}

$('#autotam').change(function(){
    if($(this).is(':checked')) {
		config().update({tam:1})
    } else {
		config().update({tam:0})		
    }
});


$('#maxtam').change(function(){
    if($(this).is(':checked')) {
		config().update({maxtam:1})
    } else {
		config().update({maxtam:0})		
    }
});

$('#propia').change(function(){  if($(this).is(':checked')) { config().update({propia:1}) } else { config().update({propia:0})    } });


$('#mayus').change(function(){
    if($(this).is(':checked')) {
		config().update({mayusculas:'uppercase'})
		vista.$data.mayusculas = 'uppercase'
    } else {
		config().update({mayusculas:'none'})		
		vista.$data.mayusculas = 'none'
    }
});



if(config().get()[0].tam != 1)
{ 	autotam.checked = false; config().update({tam:0})}


if(config().get()[0].maxtam != 1)
{ 	maxtam.checked = false;  config().update({maxtam:0}) }


if(config().get()[0].propia == 1)
{ 	propia.checked = true;  }



$('#borrartexto').change(function(){
    if($(this).is(':checked')) {
		config().update({borrartexto:1})
    } else {
		config().update({borrartexto:0})		
    }
});

if(config().get()[0].borrartexto == 0)
{ 	borrartexto.checked = false; }
else
{ config().update({borrartexto:1}) }





	if(config().get()[0].mayusculas != 'uppercase')
	{ 	mayus.checked = false;}
	else
	{	vista.$data.mayusculas = 'uppercase'	}


$('#mostrarver').change(function(){
    if($(this).is(':checked')) {
		config().update({mostrarver:1})
    } else {
		config().update({mostrarver:0})		
    }
});

if(config().get()[0].mostrarver != 1)
{ 	mostrarver.checked = false; }




$('#fuente').change(function(){
	var fufi = this.options[this.selectedIndex].value;
	vista.$data.nuevafuente = fufi + "/"+fufi;
	vista.$data.fuente = fufi;
	config().update({fuente:this.value});

	if(config().get()[0].maxtam == 1)
		{letram.noUiSlider.set(24);}

	if(config().get()[0].tam == 1)
		letram.noUiSlider.set(parseFloat(vista.$data.tama));

	if (typeof actualizarVistaPreviaFuente === 'function') {
		actualizarVistaPreviaFuente();
	}
	//	pageupdate()
});


if(inicial.neg == '0') { $('#negrilla').prop('checked', false); vista.$data.negri = 'normal';}

arr.noUiSlider.set((inicial.arr));
aba.noUiSlider.set((inicial.aba));
izq.noUiSlider.set((inicial.izq));
der.noUiSlider.set((inicial.der));

  }
function loading()
{

Swal({
	title: '',
	html: '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;"><img src="/logo.png?f=logo&t=p&v=2" class="responsive-img" style="height:50px;display:block;margin:0 auto;"><img src="/biblia.png?f=biblia&t=p" class="responsive-img" style="height:80px;display:block;margin:0 auto;"></div>',
	allowOutsideClick: false,
	footer: '',
	backdrop: '#777',
	timer: 2000,
	allowEscapeKey: false,
	onBeforeOpen: () => {
	  Swal.showLoading()
   }
  })

setTimeout(() => {
	//toast({ type: 'success',title: ''});  
	if(inicial.fuente != '') 
	{ 
		vista.$data.fuente = inicial.fuente;
		vista.$data.nuevafuente = inicial.fuente + "/"+inicial.fuente
		$('#fuente').val(vista.$data.fuente);
		if (typeof actualizarVistaPreviaFuente === 'function') {
			actualizarVistaPreviaFuente();
		}
	}
	$(document.body).attr('style','display:visible;zoom:0.9;overflow-x: hidden;');
	$('#logocentro').attr('class','responsive-img animated zoomInDown ');
	$('#textocentro').attr('class','light animated pulse');
	}, 2000);
}

function ocultador(vivo)
{
	$('#alerta').css('display','none');

objetos = ['info','bien','marco','not','fondos','videoplayer','canciones','updates'];
objetos.forEach(function (obj) {
	if(obj == vivo) {$('#'+obj).fadeIn('fast');}
	else { $("#"+obj).hide();}
	})
	$('#logo').fadeOut('fast');
	$('#logo').fadeIn('fast');

setTimeout(()=>
	{
//		$('#actualizaciones').html('.')
///		$("#msg").html("<a href='#actualizaciones'><div class='letrero center animated fadeIn'>Lee Un Mensaje del Creador de <strong>Proyektor</strong> para Tí, Click aquí. </div></a>");
	},2000)

}



const player = new t`
>div.card-panel.caja.style-7.row
	%id=player
	>div.center.flow-text
		.Reproductor de Video
	>div.center.valign-wrapper.z-depth-3
		%style=width:100%;height:auto;position:relative;padding:8px;
		>div
			%style=margin:0 auto;width:100%
			%innerHTML = {{inner = <i class="material-icons" style="font-size:60px" >ondemand_video</i><br>Debes seleccionar un video en la sección Cambiar Fondo}}
	>br
	>div.center
		%style=width:100%;height:auto;position:relative;padding:8px
		>div.row.z-depth-3
			%style=padding:16px;
			>div.col.s12.flow-text
				.Video de Youtube
			>div.col.s8
				>input
					%style=font-size:19px
					%value={{urlyoutube}}
					%placeholder=https://www.youtube.com/watch?v=XXXXXXX
				>br
				>span.{{color}}.darken-4.letrero.z-depth-3.vinculo
					%style=margin:8px;padding:10px;
					@click = quitar
					.Quitar
				>span.{{color}}.darken-2.letrero.z-depth-3.vinculo
					%style=margin:8px;padding:10px;
					@click = youtube
					.enviar
			>div.col.s4
				>div.responsive-img.youtube
					%style=height:70px;filter:drop-shadow(0px 0px 2px #CCC);
			>div.col.s12.flow-text
				%style=padding-top:20px
			>div.col.s8
				>input.center
					%id=buscayou
					@keydown.13 = buscar
					%value={{buscar}}
					%style=font-size:20px
					%placeholder=Titulo del Video
			>div.col.s4
				>span.{{color}}.darken-4.letrero.z-depth-3.vinculo.left
					>i.material-icons
						%style=top:6px;position:relative;padding-right:6px
						.search
					%style=margin:0px;padding:6px;font-size:16px
					%title=Buscar Video
					@click = buscar
				>span.{{color}}.darken-4.letrero.z-depth-3.vinculo.left
					%style=margin-left:3px;
					>i.material-icons
						%style=top:6px;position:relative;padding:6px;top:-1px
						.clear
						@click = borrar
			>br
			>br
			>div.col.s12.container.collection.animated.fadeIn.{{yuomostrar = hide}}
				+list
`;

const youturesul = t`
>a.collection-item.vinculo.row.text-darken-4.over.{{color}}-text
	@click = click
	%style=padding:4px
	>div.col.s4
		>img.responsive-img
			%src={{img}}
	>div.col.s8
		%innerHTML={{titulo}}<br><small class="grey-text">{{publicacion}}<br>{{desc}}</small>
`;

youturesul.$methods={

click({state})
{
	player.$data.urlyoutube = 'https://www.youtube.com/watch?v='+ state.$data.id
	player.$methods.youtube()
}

}

player.$methods = {

youtube()
{
var state = player;
var url=[]
url=state.$data.urlyoutube.split('v=');

	if( typeof url[1] === 'undefined')
	{
		url=state.$data.urlyoutube.split('.be/');
	}

  if(url[1] != '')
{
//$(win.page).html('<img style="height:100vh;width:100%" src="https://i.ytimg.com/vi/'+url[1]+'/hqdefault.jpg"></img>');
//vista.$data.textostyle='animation: desaparecer 1.5s ease-in-out forwards;';
vista.$data.textostyle="display:none";

$(win.page).html('<iframe style="height:100vh;width:100%" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" src="https://www.youtube.com/embed/'+url[1]+'?autoplay=1"></iframe>');

vista.$data.pagedisplay='hide';
vista.$data.video='';

pageupdate();
}
	else
	{
		toast({title:'Url Incorrecta',type:'error'});
	}
}
,

buscar({state})
{

if(typeof state.$data.buscar === 'undefined' || state.$data.buscar.length <= 4 ) 
{
	toast({title:'Escribe un texto con mas de 4 Letras',type:'error'});
}

else{

		$.post('/?youtube',{'buscar':state.$data.buscar},(respuestayoutube)=>{
		player.list = [];
		var valo = [];
		state.$data.yuomostrar = 'show';
			$.each (respuestayoutube.items, function (key, val ) {

				valo.id				=	val.id.videoId
				valo.titulo			=	val.snippet.title
				valo.img 			=	val.snippet.thumbnails.default.url
				valo.publicacion 	=	val.snippet.publishedAt
				valo.color 			=	color1
				valo.desc 			=	val.snippet.description
				player.list.push(new youturesul({$data: valo , $methods: youturesul.$methods }))
			})

		},'json')
	}
},
borrar({state})
{
$('#buscayou').val('');
state.$data.buscar='';
player.list = [];
},

quitar({state})
{
	$(win.page).html('');
	vista.$data.pagedisplay='none';
	pageupdate();
}
}

function videoplayer()
{
var color = config().get()[0].color1;
if(color=='base') {color = 'blue-grey';}

if(color=='black') {color = 'grey';}

player.$data.color = color
internet.$data.color = color

player.$mount({target: document.getElementById('player'),option:'replace'});
internet.$mount({target: document.getElementById('videop'),option:'replace'});

}


var seek;

function togglePlay() {
if ( videoElement.paused ) {
	videoElement.play()
	$('#botonplay').text('pause_circle_outline')
    } else {
		videoElement.pause()
		$('#botonplay').text('play_circle_outline');
    }
}


function tiempo (time) {
    if (time === null || time === undefined) {
        return "--";
    }
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
return  minutes + ":" + seconds
}


function goto(newVal)
{
 videoElement.currentTime = newVal * videoElement.duration;
 }

var colores = ['red','pink','purple','deep-purple','indigo','blue','light-blue','cyan','teal','green','light-green','lime','yellow','amber','orange','deep-orange','brown','grey','blue-grey','black','base','oscuro'];

function colorbox(objeto,fun,tit)
{
$('#'+objeto).html('<span style="float:left;" class="flow-text"><small>'+tit+'</small></span><br><br>');

colores.forEach(function (obj) {
htm='<span class="'+obj+' darken-2 letrero vinculo col" style="border:solid 1px #fff;height:5vh;width:4vw" title="'+obj+'" onclick="'+fun+'(\''+obj+'\')"></span>';
$('#'+objeto).append(htm);
})

}

function colorlet(co)					// COLOR  DE LAS LETRAS
	{	
		vista.$data.colortexto = ""+co; 
		config().update({colorlet: ""+co});
		if (typeof actualizarVistaPreviaFuente === 'function') {
			actualizarVistaPreviaFuente();
		}
	}

function colorsom(co)					// COLOR  DE LA SOMBRA
	{	
		vista.$data.colorsombra = ""+co; 
		config().update({colorsom: ""+co});
		if (typeof actualizarVistaPreviaFuente === 'function') {
			actualizarVistaPreviaFuente();
		}
	}


function colo(col)
{
	if(local != 1 ){
		$('#descargar').fadeIn();
	}

	// Obtener el estado actual del modo oscuro
	var blEl = document.getElementById('bl');
	var blHref = blEl ? (blEl.getAttribute('href') || '') : '';
	var isDark = (localStorage.getItem('proyektor_dark_mode') === 'true') || (blHref.indexOf('black-dark') !== -1);

	if(col != '')
	{
		// Si el usuario hace clic en el cuadro oscuro de la paleta
		if (col == 'oscuro') {
			isDark = true;
			localStorage.setItem('proyektor_dark_mode', 'true');
		}

		config().update({color1: col});

		// Mantener el modo oscuro según el estado actual independiente
		if (isDark) {
			localStorage.setItem('proyektor_dark_mode', 'true');
			if (blEl) blEl.href = "/?f=black-dark&t=c";
		} else {
			localStorage.setItem('proyektor_dark_mode', 'false');
			if (blEl) blEl.href = "";
		}

		try {
			if (local == 1) {
				$.post('?db', JSON.stringify(window.localStorage));
			}
		} catch(e) {}

		$('nav').attr('class', col + ' darken-4');
		$('#slide-out').attr('class', col + ' darken-4');
	
		if(col =='base') { $('#texto').attr('class','basedos');}
		else if(col =='black' || col =='oscuro') { $('#texto').attr('class','grey darken-3 ');}
		else { $('#texto').attr('class', col + ' darken-2'); }

		var hueIdx = colores.indexOf(col);
		if (hueIdx === -1) hueIdx = 0;
		var hue= ['140deg) saturate(2) grayscale(20%);(',120,50,40,20,15,355,325,315,260,240,210,'180deg) saturate(2) grayscale(20%);(',175,160,160,'180deg) grayscale(40%);','180deg) grayscale(80%);(','-30deg) grayscale(80%);(','0);grayscale(100%);(',0,'0deg) saturate(2) contrast(1.5) grayscale(90%);('];

		if (document.querySelector('#logocentro')) {
			document.querySelector('#logocentro').style = "filter:hue-rotate("+(hue[hueIdx] || 0)+"deg);";
		}

		if(config().get()[0].color1 == 'base' ) {color1 = 'blue-grey';}
		else if(config().get()[0].color1 == 'black' || config().get()[0].color1 == 'oscuro') {color1 = 'grey';}
		else {color1 = config().get()[0].color1;}
	}
	else
	{
		var cfgColor = (config().get()[0] && config().get()[0].color1) || 'base';
		if (cfgColor === 'oscuro') {
			isDark = true;
			localStorage.setItem('proyektor_dark_mode', 'true');
		}
		colo(cfgColor);

		if(config().get()[0].colorlet == undefined)			// Color letra y sombra por defecto
		{ config().update({colorlet: "#FFF"}); config().update({colorsom: "#224373"})	}

		if (document.querySelector('#colorle') && document.querySelector('#colorle').jscolor) {
			document.querySelector('#colorle').jscolor.fromString(config().get()[0].colorlet);
		}
		if (document.querySelector('#colorso') && document.querySelector('#colorso').jscolor) {
			document.querySelector('#colorso').jscolor.fromString(config().get()[0].colorsom);
		}

		colorlet(config().get()[0].colorlet);
		colorsom(config().get()[0].colorsom);
	}

	colores.forEach((co)=>{
		$('.conf').removeClass(co);
	});
	$('.conf').addClass(color1);
	actualizarBotonTema();
	if (typeof actualizarVistaPreviaFuente === 'function') {
		actualizarVistaPreviaFuente();
	}
}

function toggleModoOscuro() {
	var blEl = document.getElementById('bl');
	var blHref = blEl ? (blEl.getAttribute('href') || '') : '';
	var isDark = (localStorage.getItem('proyektor_dark_mode') === 'true') || 
	             (blHref.indexOf('black-dark') !== -1);
	
	if (isDark) {
		// Desactivar modo oscuro -> Modo Claro
		localStorage.setItem('proyektor_dark_mode', 'false');
		if (blEl) blEl.href = "";
	} else {
		// Activar modo oscuro -> Modo Oscuro
		localStorage.setItem('proyektor_dark_mode', 'true');
		if (blEl) blEl.href = "/?f=black-dark&t=c";
	}
	
	// Mantener el color de contorno actual
	var actualColor = (config().get()[0] && config().get()[0].color1) || 'base';
	if (actualColor === 'oscuro' && isDark) {
		actualColor = 'base';
		config().update({color1: 'base'});
	}
	
	colo(actualColor);
	actualizarBotonTema();
	
	try {
		if (local == 1) {
			$.post('?db', JSON.stringify(window.localStorage));
		}
	} catch(e) {}
}

function actualizarBotonTema() {
	var btn = document.getElementById('btn-theme-toggle');
	if (!btn) return;
	
	var blEl = document.getElementById('bl');
	var blHref = blEl ? (blEl.getAttribute('href') || '') : '';
	var isDark = (localStorage.getItem('proyektor_dark_mode') === 'true') || 
	             (blHref.indexOf('black-dark') !== -1);
	
	var iconEl = document.getElementById('theme-icon');
	var textEl = document.getElementById('theme-text');
	
	if (isDark) {
		if (iconEl) iconEl.innerHTML = '☀️';
		if (textEl) textEl.textContent = 'Modo Claro';
		btn.setAttribute('data-tooltip', 'Cambiar a Modo Claro');
		btn.classList.add('theme-toggle-dark');
		btn.classList.remove('theme-toggle-light');
	} else {
		if (iconEl) iconEl.innerHTML = '🌙';
		if (textEl) textEl.textContent = 'Modo Oscuro';
		btn.setAttribute('data-tooltip', 'Cambiar a Modo Oscuro');
		btn.classList.add('theme-toggle-light');
		btn.classList.remove('theme-toggle-dark');
	}
	try {
		$(btn).tooltip();
	} catch(e) {}
}

function actualizarVistaPreviaFuente() {
	var select = document.getElementById('fuente');
	var previewText = document.getElementById('font-preview-text');
	var previewName = document.getElementById('font-preview-name');
	if (!select || !previewText) return;
	
	var fufi = select.value || (config().get()[0] && config().get()[0].fuente) || 'quicksand';
	
	var descripciones = {
		'quicksand': 'Quicksand • Redondeada Moderna',
		'raleway': 'Raleway • Elegante y Fina',
		'roboto': 'Roboto • Sans-serif Limpia',
		'lato': 'Lato • Clásica y Clara',
		'dosis': 'Dosis • Alta y Estilizada',
		'oregano': 'Oregano • Manuscrita Casual',
		'kaushanscript': 'Kaushan Script • Cursiva Dinámica',
		'tangerine': 'Tangerine • Caligráfica Artística',
		'atami': 'Atami • Geométrica Futurista'
	};
	
	// Aplicar familia tipográfica
	previewText.style.fontFamily = "'" + fufi + "', sans-serif";
	
	// Aplicar negrita según configuración
	var isNeg = document.getElementById('negrilla') ? document.getElementById('negrilla').checked : true;
	previewText.style.fontWeight = isNeg ? 'bold' : 'normal';
	
	// Aplicar color de texto
	var colorLet = (config().get()[0] && config().get()[0].colorlet) || '#FFFFFF';
	previewText.style.color = colorLet;
	
	// Aplicar sombra
	var colorSom = (config().get()[0] && config().get()[0].colorsom) || '#224373';
	previewText.style.textShadow = '0px 2px 4px ' + colorSom + ', 0px 0px 8px ' + colorSom;
	
	if (previewName) {
		previewName.textContent = descripciones[fufi] || ('Fuente: ' + fufi);
	}
}

function cambiarFuenteRelativa(delta) {
	var select = document.getElementById('fuente');
	if (!select || !select.options || select.options.length === 0) return;
	var idx = select.selectedIndex + delta;
	if (idx < 0) idx = select.options.length - 1;
	if (idx >= select.options.length) idx = 0;
	select.selectedIndex = idx;
	$(select).trigger('change');
}

const updat= new t `
>div.col.s12.row
	>div.flow-text.center
		.Paquetes Disponibles - (Requiere Internet)
	>div.responsive-img.loading.animated.{{display}}
		%style=height:40px
	>div.container.collection.col.m6.l4.z-depth-4
		%style=padding:0px;transform: scale(0.8,0.8);
		>a.collection-item.vinculo.row
			#onclick=updates('biblias')
			%style=padding:6px
			>div.bibliaicon.center.col.s3
				%style=width:72px;height:72px;position:relative;left:20px
			>div.title.text-darken-2.grey-text.right.col.truncate.s9
				%style=font-size:25px
				>br
				.Versiones de la Biblia
		>a.collection-item.vinculo.row
			#onclick=updates('imagenes')
			%style=padding:6px
			>div.paisaje.center.col.s3
				%style=width:72px;height:72px;position:relative;left:20px
			>div.title.text-darken-2.grey-text.right.col.s9.truncate
				%style=font-size:25px
				>br
				.Imágenes
		>a.collection-item.vinculo.row
			#onclick=updates('videos')
			%style=padding:6px
			>div.video.center.col.s3
				%style=width:72px;height:72px;position:relative;left:20px
			>div.title.text-darken-2.grey-text.right.col.s9.truncate
				%style=font-size:25px
				>br
				.Videos
		>a.collection-item.vinculo.row
			#onclick=updates('fuentes')
			%style=padding:6px
			>div.fuente.center.col.s3
				%style=width:72px;height:72px;position:relative;left:20px
			>div.title.text-darken-2.grey-text.right.col.s9.truncate
				%style=font-size:25px
				>br
				.Tipos de Letra
		>a.collection-item.vinculo.row
			#onclick=updates('cancioneros')
			%style=padding:6px
			>div.teclado.center.col.s3
				%style=width:72px;height:72px;position:relative;left:20px
			>div.title.text-darken-2.grey-text.right.col.s9.truncate
				%style=font-size:25px
				>br
				.Himnarios y Cancioneros
	>div.col.m6.l8
		%style=padding-right:20px
		>ul.collapsible
			+list
`;


const upda = t`
>li.z-depth-2
	>div.collapsible-header.text-darken-2.grey-text
		%style=font-size:20px
		>i.material-icons.{{color = blue-grey-text.text-darken-2}}
			%style=font-size:20px
			.{{icon = cloud_download}}
		>img
			%style=margin-right:10px;filter: opacity(80%);display:{{bande = none}};
			%src=https://flagcdn.com/24x18/{{bandera = nada}}.webp
		>span
			%innerHTML={{nombre}}
		>small.right
			.({{cantidad}} Elementos) - {{tamaño}}
	>div.collapsible-body
		%style=padding:23px
		>div.letrero.blue-grey.{{color = darken-3}}.vinculo.center.waves-effect.waves-light.{{hide}}.right
			%style=padding:6px;
			.{{texto = Instalar}}
			@click=bajar
		>div
			%style=padding-right:120px
			%innerHTML= {{descripcion}}
			>br
			>br
		>div.{{noimg}}
			%style=max-width:400px
			>img.responsive-img.{{mate}}
				%src=//proyektor.labiblia.in/paketes/preview/{{preview}}
			>br
`
function updates(orden)
{
	$('#upd').html('');
	updat.$data.display = 'fadeIn';
	$.getJSON ('?update=p', function (data ) {
	updat.list = [];
	

	$.each (data, function (key, val ) {

if(val.tipo == orden)
  {
	if(val.preview == null){ 
		
		//val.preview='/?f=sinimagen&t=jp';
		val.noimg='hide';
		}
	else{val.mate="materialboxed"}

	if (val.bandera != null){val.bande="inline";}

	
	if(val.yaesta ==1){val.color='lighten-4'; val.texto='Instalado'; val.icon='check_circle' ;val.color='green-text text-darken-3';val.hide='hide'; }
	
	if(local != 1 ) {val.texto='Descarga la Versión Portable para Instalar'; }

	updat.list.push(new upda({$data: val,$methods: { bajar({state})
	{

		if(val.yaesta ==0 && state.$data.texto =='Instalar' ){
			state.$data.texto ='Espere Por Favor'
			async function dow(fname) {
				var str = await fetch(fname)
				return await str.text()
			}
			
			dow("/?update=d&d="+key).then( function (dat){
				if (dat == 1)
				{toast({ type: 'success',title: '<h5>Paquete Instalado Correctamente</h5>'});}
					updates(orden);
			})
		}
		else if(val.yaesta ==0 && state.$data.texto =='Espere Por Favor'){
			toast({ type: 'warning',title: 'Estoy Ocupado Descargando el Paquete,  Espera..!!'});
		}

		else{
	toast({ type: 'info',title: 'Ya está Instalado este Paquete'});
		}
	}


} }));

	}
})
	updat.$data.display = 'fadeOut';
	$('.collapsible').collapsible();
    $('.materialboxed').materialbox();

	})

	updat.$mount({target: document.getElementById('upd')});
}


function actualizador()
{
	async function dow(fname) {
		var str = await fetch(fname)
		return await str.text()
	}
	
	dow("/?update").then( function (dat){
		if (dat == 1)
		{
			toast({ type: 'success',title: '<h5>Actualización Exitosa</h5>'});
			window.location.reload();
		}
	})
}
/*
if(local != 1){  
	setTimeout(() => actualizador() ,1000);
}
*/

/*
config1 = {	locateFile: filename => `/?f=${filename}&t=j` }
var arra=[];
var db;

async function iniciardb()
{
const sqlPromise = initSqlJs(config1);
//const dataPromise = fetch("../biblias/RV1960.bblx").then(res => res.arrayBuffer());
const dataPromise = fetch("../biblias/RV1960.bblx").then(res => res.arrayBuffer());

const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
db = new SQL.Database(new Uint8Array(buf));
	db.create_function("regx", function (x,cadena) { 
		ex = new RegExp(cadena, 'i')
		var n =x.search(ex);
		if( n >= 1)  return 1;
		else return 0;
	})
}

function consultasql(linea,opt = '',libro ='')
{
		arra=[];
	if(opt == 'busqueda')
	{	try{
		//alert('select * from bible where book '+libro+' and regx(scripture,"'+linea+'") == 1 ')
			var contents = db.exec('select * from bible where book '+libro+' and regx(scripture,"'+linea+'") == 1 ');
			contents[0].values.forEach(element => {
			libr= libros[parseInt(element[0])-1].ti;

			arra.push({tit: libr,lib: element[0],cap: element[1],ver: element[2],tex:element[3]})
				});
		}
		catch(e){}
	return arra;
	}
	else if(opt == 'capitulo')
	{
		try{
			var contents = db.exec('select scripture from bible where Chapter = '+linea +' and Book ='+libro);
			contents[0].values.forEach(element => {
			arra.push({tex:element[0]})
				});
		}
		catch(e){}
		return arra;
	}
	else if(opt == 'numcapitulos')
	{
		try{
			var contents = db.exec('select Chapter from bible where Book = '+libro +' group by Chapter');
			contents[0].values.forEach(element => {
			arra.push({c:element[0]})
				});
		}
		catch(e){}
		return arra;
	}
}
*/

const imgsfav = new t`
>div.row
	+list
`

const  imagpek =  t`
>div.col.s4.vinculo
	>div.card.z-depth-0
		%style=background-color:#F8F8F8;
		>div
			@click = cambiarimg
			>img.responsive-img.imag.lazy
				#onclick = favoritclick();
				#draggable = false
				#style= height:auto;max-height:80px;min-height:80px;width:100%
				%src={{tum}}
				#title={{tt}}
`

const  videpek =  t`
>div.col.s4.vinculo
	>div.card.z-depth-0
		%style=background-color:#F8F8F8;
		>div
			@click = cambiarvide
			>video.responsive-video.imag
				#onclick = favoritclick();
				#preload = metadata
				#style= max-height:80px;height:auto;min-height:80px;background-color:#000
				#src={{i}}
				#title={{tt}}
`


function imgfavoritas()
{


$("#favorit").html('')
imgsfav.list=[];
$.get('/?imagenes=l&l=../fondos/Favoritos',function (data) {

if(data != '')
	{
	$.each(data, function(key, val ) {

	if(val.m == 'i')
	{
		if(val.tum == undefined)
			{  val.tum = val.i;}
			val.url= val.i;
		imgsfav.list.push(new imagpek({$data: val,$methods : fondos.$methods}))
	}

	if(val.m == 'v')
	{
		if(val.tum == undefined)
			{  val.tum = val.i;	}
			val.url= val.i;
			loadvideo(val.i).then((res)=>{ 
				imgsfav.list[key].$data.i=res;
			})

		imgsfav.list.push(new videpek({$data: val,$methods : fondos.$methods}))
	}

		})
	}
else{
	$("#favorit").html('<img src="/?f=sinimagen&t=jp" class="center"><br><h6 class="">Debes poner Imágenes en la carpeta  fondos\\Favoritos</h6>')
	}
	imgsfav.$mount({target: document.getElementById('favorit') })
},'json')
}


function favoritclick()
{
 if(config().get()[0].borrartexto == 1)
 {
	 cambiartexto('','')
 }

}


function bibliaget()
{
		biblias().get().forEach((value,key)=>{
		$('#biblia' + (key+1)).val(value.n)
		})
}


function cambiabiblia(name,nu)
{
v = name.split('- ');
biblias({id: {'==': nu}}).update({n:name,abr:v[1]});
}


const versionboton = t `
>div.col.m3.l2.waves-effect.waves-light.btn.{{color}}.{{color2}}.white-text.center
	@click = cambversion:{{version}}
	#title= {{title}}
	.{{abr}}
`


versionbotones.$methods = {
	cambversion({value})
	{

var verso = 0
	for (i = 0; i < capitulo.list.length; i++) {
		if(capitulo.list[i].$data.resalta != "" && capitulo.list[i].$data.resalta != undefined){
			verso = i+1;
		}
	}
$("#versionabr").text(versionbotones.list[value].abr);

texto(capitulos.$data.titulo ,capitulo.list[0].$data.lib,capitulo.list[0].$data.cap,verso,value) 
setTimeout(()=>{ window.location.href="#"+verso	},180);
	}

}
 

function versbotones()												///  MONTA LOS BOTONES de LAS VERSIONES Y LES DA VALOR
{
document.getElementById('vers').innerHTML='';

var cont=1;
$.get('?biblias',(datos)=>{
	
	versionbotones.list=[]

	$.each(datos, function(key, val ) {
	
	v = val.n.split(' - ');

	val.color = color1;
	val.color2 = 'darken-3';
	val.abr = v[1];
	val.title = val.n
	val.version = cont;

	if(biblias().get()[0].abr == val.abr)
	{
	val.color2 = 'darken-4';
	val.version =0;
	cont = cont -1 ;
	versionbotones.list.unshift(new versionboton({$data: val,$methods : versionbotones.$methods}))	
	}
	else{
	versionbotones.list.push(new versionboton({$data: val,$methods : versionbotones.$methods}))
	}
	cont++;
	})

},'json');

versionbotones.$mount({target: document.getElementById('vers') })
}


function reloj()
{
    fechahora = new Date();
/*
    var hora = fechahora.getHours(); 
    var minuto = fechahora.getMinutes(); 
    var segundo = fechahora.getSeconds(); 
	hora = (hora < 10) ? "0" + hora : hora;
    minuto = (minuto < 10) ? "0" + minuto : minuto;
    segundo = (segundo < 10) ? "0" + segundo : segundo;
    var tiempo = hora + ":" + minuto + ":" + segundo
*/
	if(supervar != undefined && supervar != '')
	{
		ahora = fechahora.toLocaleTimeString('en-US');
	if(vista.$data.texto != ahora)
		{
		try		{
			vista.$data.texto= ahora
			vista.$data.versi ='';
			pageupdate()
			reloj();
			}
			catch(e){}
		}
		else
		{
			setTimeout(()=>{reloj();},500)
		}
	}
}

function cuentatras()
{

if(supervar != undefined && supervar != '')
	{
  let diferencia= supervar-Date.now();
  let sg = diferencia/1000
		if (diferencia<=0) {
			sg=0.0;
		supervar= undefined
		}

	ahora = moment().startOf("day").seconds(sg).format("HH:mm:ss");

	if(vista.$data.texto != ahora)
	{
	vista.$data.texto= ahora;
	vista.$data.versi ='';
		pageupdate()
		setTimeout(()=>{try{cuentatras()}catch(e){} },500);
	}
	else
	{
		setTimeout(()=>{try{cuentatras()}catch(e){} },500);
	}
  }
}

function crono()
{
	if(supervar != undefined && supervar != null)
	{

  	let diferencia=  Date.now() - supervar;
  	let sg = diferencia/1000
		if (diferencia<=0) {
			sg=0.0;
		supervar= undefined
		}

		ahora = moment().startOf("day").seconds(sg).format("HH:mm:ss");

	if(vista.$data.texto != ahora)
	{
		vista.$data.texto= ahora
		vista.$data.versi ='';
		pageupdate()
		setTimeout( ()=>{ try{crono()} catch(e){} },500) 
	}
	else
	{
		setTimeout( ()=>{ try{crono()} catch(e){} },500) 
	}
	
	}
}



internet.$methods = {
cuentatras()
{
	if(supervar =='' || supervar== undefined)
		{

	(async function getUrl () {
		const {value: minutos} = await Swal({
		  input: 'number',
		  html:'<h5>Cuantos Minutos?</h5>',
		  inputPlaceholder: 'Solo Numeros',
  		  showCancelButton:  true
		})
		
		if (minutos) {
		vista.$data.textostyle="display:visible";
		supervar = Date.now() + (minutos * 60000);		
		vista.$data.tama =18;
	    vista.$data.taman = 19;
		cuentatras();
		}
				})();

		}
	else{
		supervar= undefined
		cambiartexto('','')
	}

},

cronometro()
{

		if(supervar =='' || supervar== undefined)
		{
			supervar= Date.now();
			crono();
			vista.$data.tama =18;
		    vista.$data.taman = 19;
			vista.$data.textostyle="display:visible";
		}
	else{
		supervar= undefined
		}

},
reloj()
{
	if(supervar =='' || supervar== undefined)
		{
		supervar=1
		reloj();
		vista.$data.tama =18;
	    vista.$data.taman = 19;
		vista.$data.textostyle="display:visible";
		}
	else{
		supervar= undefined
		cambiartexto('','')
	}
},

	poner({state})
	{
	var url=state.$data.paginaweb;
	
	if(url != '' )
	{
		if(url.search(/http/i) == -1)	{  url = 'http://' + url  }
		$(win.page).html('<iframe id="player" style="height:100vh;width:100%" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src="'+url+'"></iframe>');
		vista.$data.pagedisplay='block';
	}
	else{  	toast({title:'Url Incorrecta',type:'error'}); }
	pageupdate();
	vista.$data.video='';
	},
	
	quitar({state})
	{
		$(win.page).html('');
		vista.$data.pagedisplay='none';
		pageupdate();
	},

	codeponer({state})
	{
	if(state.$data.codehtml != '' )
	{
		$(win.page).html(state.$data.codehtml);
		vista.$data.pagedisplay='block';
		vista.$data.video='';
	}
	else{  	toast({title:'No hay Código',type:'error'}); }
	pageupdate();
}
}

function descargar()
{
Swal({
	title: '<h5 class="light">Descargar</h5>',
	html: '<div class="biblia responsive-img row" style="height:100px"><div class="col s6"><a href="Proyektor - 64Bits.zip"><img src="/?f=win&t=jp" class="vinculo"></a><br>Windows 64 Bits</div><div class="col s6"><a href="Proyektor - 32Bits.zip"><img src="/?f=win&t=jp" class="vinculo"></a><br>Windows 32 Bits</div>'+
	'<div class="col s6"><br><br><a href="Proyektor - Linux.zip"><img src="/?f=linux&t=jp" class="vinculo"></a><br>Linux 64 Bits</div>'+
	'<div class="col s6"><br><br><a href="Proyektor MAC.zip"><img src="/?f=macosx&t=jp" class="vinculo" style="width:40px;height:50px"></a><br>macOS</div></div>',
	footer: '<div class="center">Una vez abierto se actualizará a la última versión  despues de unos segundos</div>',
	confirmButtonText: 'Cerrar',
  	confirmButtonColor: '#003366',
  })
}

function letrador()
{
	(async function getUrl () {
		if(inicial.letrador == undefined){config().update({letrador:'bold=0&sombra=0&size=15&anuncios=0&fondo=335566'});}

		const {value: url} = await Swal({
		input: 'text',
		html:'<h5><small>Configura los parametros<br>La fuente por defecto es Raleway debes instalarla</small></h5>',
		inputPlaceholder: '',
  		showCancelButton:  true,
		inputValue: config().get()[0].letrador ,
		footer: '<div class="row"><div class="s6 col"><b>bold</b> = Negrilla (0,1)</div>'+
				'<div class="s6 col"><b>sombra</b> (0,1)</div>'+
				'<div class="s6 col"><b>size</b> = Tamaño letra</div>'+
				'<div class="s6 col"><b>fondo</b> = Color Hexadecimal</div>'+
				'<div class="s6 col"><b>font</b> = Tipo de Letra</div>'+
				'<div class="s6 col"><b>anuncios</b> = permite o no anuncios en movimiento</div></div>',
		})
		
		if (url) {
		config().update({letrador:url});

		win2=window.open( window.location.protocol +`//`+ window.location.host + '/?texto&'+url,"letras", "width="+screen.width+",height=200,scrollbars=no,menubar=yes,toolbar=no,status=no");
		win2.moveTo(1,screen.width + 200);

		}
				})();
}

function actdb(evt)
{
//console.log(evt);

	evt.preventDefault();
		if(local == 1)
			{
				if(window.localStorage.taffy_favor == 'null')
				{window.localStorage.taffy_favor ='[]'; }

				$.post('?db',JSON.stringify(window.localStorage),()=>{
					console.log('y porque para siempre es su Misericordia');
				});
			return "Porque Dios es Bueno, ";
			}
}
