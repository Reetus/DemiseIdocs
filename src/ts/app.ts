import * as $ from 'jquery';
import * as strftime from 'strftime';
import { UI } from './ui';
import { IHouseEntry } from "./interfaces";

declare var addRow:any;
declare var delRow:any;

var mapToName:Array<string> = ['Felucca', 'Trammel', 'Ilshenar', 'Malas', 'Tokuno'];

function addEntry(entry: IHouseEntry):void {
    var mapName:string = mapToName[entry.location.map];
    addRow([entry.owner, strftime('%F %T', new Date(entry.firstSeen)), entry.condition, `<a href="#" class="maplink" data-pos-x="${entry.location.x}" data-pos-y="${entry.location.y}" data-pos-map="${entry.location.map}">(${entry.location.x}, ${entry.location.y}, ${mapName})</a>`, '<a href="#" class="mapremove">Remove</a>']);
}

$(document).ready(() => {
    var canvas:any = <HTMLCanvasElement>document.getElementById('canvas');

    var ui = new UI(canvas);

    preloadImages()
    .then((d) => {
        $('.overlay').css('display', 'none');
        initEvents(ui);
        ui.setMaps(d);
        ui.drawMap(987, 525, 3);

        $.getJSON('houses.json', function(data) {
            data.map(function(t:IHouseEntry) {
                addEntry({owner: t.owner, name: t.name, firstSeen: t.firstSeen, condition: t.condition, location: {x: t.location.x, y: t.location.y, map: t.location.map}});
            });
        })
    })
});

function preloadImages():Promise<HTMLImageElement[]> {
    return new Promise((resolve, reject) => {
        var a:Array<any> = [];
        a[0] = loadImage('/images/Felucca-runes.png');
        a[1] = loadImage('/images/Trammel-runes.png');
        a[3] = loadImage('/images/Malas-runes.png');
        a[4] = loadImage('/images/Tokuno-runes.png');

        Promise.all(a)
        .then((d) => {
            resolve(d);
        });
    })
}

function initEvents(ui:UI) {
    var doc:any = $(document);
    doc.on('click', '.maplink', function(e:UIEvent) {
        var x:number = parseInt($(this).attr('data-pos-x'));
        var y:number = parseInt($(this).attr('data-pos-y'));
        var map:number = parseInt($(this).attr('data-pos-map'));
        ui.drawMap(x, y, map);
        e.preventDefault();
    })

    doc.on('click', '.mapremove', function(e:UIEvent) {
        delRow($(this).parents('tr'));
        e.preventDefault();        
    });

    $(window).resize((e) => {
        ui.setHeight();
        ui.redrawMap();
    })    
}

function loadImage(url:string):Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        var newimg:HTMLImageElement = new Image();

        newimg.onload = () => {
            resolve(newimg);
        }

        newimg.src = url;
    });
}