
/* class shape */
class Shape extends Movable {
    id = 0;
    type = "";
    x = 10;
    y = 10;
    border = true;
    border_weight = 1;
    border_color = "black";
    fill = false;
    fill_color = "black";
    paper = null;
    rotationX = 0;
    rotationY = 0;
    rotationZ = 0;
    zIndex = 0;

    constructor(id, x, y, border, border_weight, border_color,
        fill, fill_color, zIndex, properties,
        rotationX, rotationY, rotationZ) {
        super();
        this.id = id ? id : this.id;
        this.x = x ? x : this.x;
        this.y = y ? y : this.y;
        this.border = border != null ? border : this.border;
        this.border_weight = border_weight ? border_weight : this.border_weight;
        this.border_color = border_color ? border_color : this.border_color;
        this.fill = fill != null ? fill : this.fill;
        this.fill_color = fill_color ? fill_color : this.fill_color;
        this.properties = properties ? properties : this.properties;
        this.zIndex = zIndex != null ? zIndex : this.zIndex;
        this.rotationX = rotationX ? rotationX : this.rotationX;
        this.rotationY = rotationY ? rotationY : this.rotationY;
        this.rotationZ = rotationZ ? rotationZ : this.rotationZ;
    }
    load_json(_json) {
        this.id = _json.id ? _json.id : this.id;
        this.x = _json.x ? _json.x : this.x;
        this.y = _json.y ? _json.y : this.y;
        this.border = _json.border != null ? _json.border : this.border;
        this.border_weight = _json.border_weight ? _json.border_weight : this.border_weight;
        this.border_color = _json.border_color != null ? _json.border_color : this.border_color;
        this.fill = _json.fill != null ? _json.fill : this.fill;
        this.fill_color = _json.fill_color ? _json.fill_color : this.fill_color;
        this.properties = _json.properties ? _json.properties : this.properties;
        this.zIndex = _json.zIndex != null ? _json.zIndex : this.zIndex;
        this.rotationX = _json.rotationX ? _json.rotationX : this.rotationX;
        this.rotationY = _json.rotationY ? _json.rotationY : this.rotationY;
        this.rotationZ = _json.rotationZ ? _json.rotationZ : this.rotationZ;
    }
    get_json() {
        return {
            id: this.id,
            type: this.type,
            x: this.x,
            y: this.y,
            border: this.border,
            border_weight: this.border_weight,
            border_color: this.border_color,
            fill: this.fill,
            fill_color: this.fill_color,
            properties: this.properties,
            zIndex: this.zIndex,
            rotationX: this.rotationX,
            rotationY: this.rotationY,
            rotationZ: this.rotationZ
        }
    }
    // methode appeler pour dessiner le shape
    draw() {
        let svg = this.get_svg();
        if (!svg) {
            this.add_svg();
            svg = this.get_svg();
            this.set_event(svg);
        } else {
            this.update_svg();
            this.set_event(svg);
        }
        svg.style.position = "absolute";
        svg.style.left = this.x + "px";
        svg.style.top = this.y + "px";
        svg.style.left = this.x + "px";
        svg.style.zIndex = this.zIndex;
        svg.style.transform = "rotateX(" + this.rotationX + "deg) rotateY(" + this.rotationY + "deg) rotateZ(" + this.rotationZ + "deg)";
        if (this.fill) {
            svg.style.fill = this.fill_color;
        } else {
            svg.style.fill = "transparent";
        }
        if (this.border) {
            svg.style.stroke = this.border_color;
            svg.style.strokeWidth = this.border_weight;
        } else {
            svg.style.stroke = "#fffff";
            svg.style.strokeWidth = 0;
        }
    }
    /* 
        permet d'ajouter le  svg lier au shape :
        contenue a completer par les enfant
    */
    add_svg() {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute("id", this.get_svg_id());
        svg.setAttribute("data-shape", this.id);
        return svg;
    }
    // permet de redessiner  le shape
    update_svg() {
        /* contenue a redefinir par les class enfant */
    }
    /* permet d'agrandir les dimension du shape */
    scale(k) {
        this.border_weight *= k;
    }
    getArea() {
        // renvoie l'aire du shape
        return 0;
    }
    getPerimeter() {
        // renvoie l'aire du shape
        return 0;
    }
    // renvoie un tableau de divers calcul propre au type du shape sous forme cle valeur
    getCustomCalcul() {
        return [];
    }
    /* renvoie les noms des element de shape.properties */
    get_properties_name() {
        /* contenue a redefinir par les class enfant */
        return []
    }
    //renvoie l'element html lier au shape (svg)
    get_svg() {
        return document.getElementById(this.get_svg_id());
    }
    get_svg_id() {
        return "shape_" + this.id
    }

    /* ajoute des evement au svg*/
    set_event(svg) {
        svg.onmousedown = function (e) {
            if (PageDessin.current_mode == PageDessin.mode.SELECT) {
                on_down_shape(svg, e);
            } else
                if (PageDessin.current_mode == PageDessin.mode.SCALE) {
                    on_down_shape_scale(svg, e);
                }
        };
        svg.onclick = function (e) {
            if (PageDessin.current_mode == PageDessin.mode.SELECT) {
                select_current_shape(svg);
            }
        }
        svg.onmouseup = function (e) {
            if (PageDessin.current_mode == PageDessin.mode.SELECT) {
                on_up_shape(svg, e);
            } else
                if (PageDessin.current_mode == PageDessin.mode.SCALE) {
                    on_up_shape_scale(svg, e);
                }
        };
        svg.onmousemove = function (e) {
            if (PageDessin.current_mode == PageDessin.mode.SELECT) {
                on_move_shape(svg, e);
            } else
                if (PageDessin.current_mode == PageDessin.mode.SCALE) {
                    on_move_shape_scale(svg, e);
                }
        };
        svg.onmouseleave = function (e) {
            on_up_shape(svg, e);
        };
    }
    get_paper() {
        let id_paper = "_paper";
        return document.getElementById(id_paper);
    }
}

class Square extends Shape {
    type = "square";
    properties = [100];
    border = 10;
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let w = this.properties[0] + 2 * this.border_weight;
            svg.setAttribute("width", w);
            svg.setAttribute("height", w);
            svg.innerHTML = '<rect x="' + this.border_weight + '" y="' + this.border_weight + '" width="' + this.properties[0] + '" height="' + this.properties[0] + '" />';
            paper.append(svg);
        }
    }

    update_svg() {
        let svg = this.get_svg();
        let w = this.properties[0] + 2 * this.border_weight;
        svg.setAttribute("width", w);
        svg.setAttribute("height", w);
        svg.innerHTML = '<rect x="' + this.border_weight + '" y="' + this.border_weight + '" width="' + this.properties[0] + '" height="' + this.properties[0] + '" />';
    }
    get_properties_name() {
        return ["width"]
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.draw();
    }
    getArea() {
        // renvoie l'aire du shape
        let w = this.properties[0];
        return round(w * w, 2);
    }
    getPerimeter() {
        // renvoie l'aire du shape
        let w = this.properties[0];
        return round(4 * w, 2);
    }
}

class Rectangle extends Shape {
    type = "rectangle";
    properties = [100, 200];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let w = this.properties[1] + 2 * this.border_weight;
            let h = this.properties[0] + 2 * this.border_weight;
            svg.setAttribute("width", w);
            svg.setAttribute("height", h);
            svg.innerHTML = ' <rect x="' + this.border_weight + '" y="' + this.border_weight + '" width="' + this.properties[1] + '" height="' + this.properties[0] + '" />';
            paper.append(svg);
        }
    }

    update_svg() {
        let svg = this.get_svg();
        let w = this.properties[1] + 2 * this.border_weight;
        let h = this.properties[0] + 2 * this.border_weight;
        svg.setAttribute("width", w);
        svg.setAttribute("height", h);
        svg.innerHTML = ' <rect x="' + this.border_weight + '" y="' + this.border_weight + '" width="' + this.properties[1] + '" height="' + this.properties[0] + '" />';
    }
    get_properties_name() {
        return ["height", "width"]
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.properties[1] *= k;
        this.draw();
    }
    getArea() {
        // renvoie l'aire du shape
        let w = this.properties[1];
        let h = this.properties[0];
        return round(h * w, 2);
    }
    getPerimeter() {
        // renvoie l'aire du shape
        let w = this.properties[1];
        let h = this.properties[0];
        return round(2 * (w + h), 2);
    }

}

class Losange extends Shape {
    type = "losange";
    properties = [100, 60];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let r = this.properties[0];
            let angle = this.properties[1];
            let w = 2 * (r + this.border_weight);
            svg.setAttribute("width", w);
            svg.setAttribute("height", w);
            let coords = losange_coord(r, angle,this.border_weight);
            svg.innerHTML = '<polygon points=" ' + get_points_svg(coords) + '" />';
            paper.append(svg);
        }
    }
    update_svg() {
        let svg = this.get_svg();
        let r = this.properties[0];
        let angle = this.properties[1];
        let w = 2 * (r + this.border_weight);
        svg.setAttribute("width", w);
        svg.setAttribute("height", w);
        let coords = losange_coord(r, angle,this.border_weight);
        svg.innerHTML = '<polygon points=" ' + get_points_svg(coords) + '" />';
    }
    get_properties_name() {
        return ["r", "angle"]
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.draw();
    }
    getArea() {
        // renvoie l'aire du shape
        let r = this.properties[0];
        let angle = this.properties[1];
        angle = Math.PI * angle / 180;
        let area = 2 * r * r * (Math.sin(angle / 2) * Math.cos(angle / 2))
        return round(area, 2);
    }
    getPerimeter() {
        // renvoie l'aire du shape
        let r = this.properties[0];
        return round(4 * r, 2);
    }
    getCustomCalcul() {
        let r = this.properties[0];
        let angle_ = this.properties[1];
        let angle = (angle_ / 2) * Math.PI / 180;
        let dx = 2 * r * Math.cos(angle); dx = round(dx, 2);
        let dy = 2 * r * Math.sin(angle); dy = round(dy, 2);
        let angle2 = 180 - angle_;
        return [["angle2", angle2], ["diagonale horizontale", dx], ["diagonale vertical", dy]];
    }

}


class Triangle extends Shape {
    type = "triangle";
    properties = [300];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let cote = this.properties[0];
            let w = cote + 2 * (this.border_weight);
            let h = cote / (2 * Math.tan(Math.PI / 3)) + cote / (2 * Math.sin(Math.PI / 3)) + 2 * (this.border_weight);
            svg.setAttribute("width", w);
            svg.setAttribute("height", h);
            let coords = triangle_isocele_coord(cote,this.border_weight);
            svg.innerHTML = '<polygon points=" ' + get_points_svg(coords) + '" />';
            paper.append(svg);
        }
    }

    update_svg() {
        let svg = this.get_svg();
        let cote = this.properties[0];
        let w = cote + 2 * (this.border_weight);
        let h = cote / (2 * Math.tan(Math.PI / 3)) + cote / (2 * Math.sin(Math.PI / 3)) + 2 * (this.border_weight);
        svg.setAttribute("width", w);
        svg.setAttribute("height", h);
        let coords = triangle_isocele_coord(cote,this.border_weight);
        svg.innerHTML = '<polygon points=" ' + get_points_svg(coords) + '" />';
    }
    get_properties_name() {
        return ["cote"]
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.draw();
    }

}

class Hexagone extends Shape {
    type = "hexagone";
    properties = [100];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let r = this.properties[0];
            let w = 2 * (r + this.border_weight);
            svg.setAttribute("width", w);
            svg.setAttribute("height", w);
            let coords = hexagone_coord(r,this.border_weight);
            svg.innerHTML = '<polygon points=" ' + get_points_svg(coords) + '" />';
            paper.append(svg);
        }
    }

    update_svg() {
        let svg = this.get_svg();
        let r = this.properties[0];
        let w = 2 * (r + this.border_weight);
        svg.setAttribute("width", w);
        svg.setAttribute("height", w);
        let coords = hexagone_coord(r,this.border_weight);
        svg.innerHTML = '<polygon points=" ' + get_points_svg(coords) + '" />';
    }
    get_properties_name() {
        return ["r"];
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.draw();
    }
    getArea() {
        // renvoie l'aire du shape
        let r = this.properties[0];
        let area = (3 * Math.sqrt(3) * r * r) / 2;
        return round(area, 2);
    }
    getPerimeter() {
        // renvoie l'aire du shape
        let r = this.properties[0];
        return round(6 * r, 2);
    }
}

class Circle extends Shape {
    type = "circle";
    properties = [100];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let r = this.properties[0];
            let w = 2 * (r + this.border_weight);
            svg.setAttribute("width", w);
            svg.setAttribute("height", w);
            svg.innerHTML = ' <circle cx="' + w / 2 + '" cy="' + w / 2 + '" r="' + r + '" />';
            paper.append(svg);
        }
    }
    update_svg() {
        let r = this.properties[0];
        let width = 2 * (r + this.border_weight);
        let svg = this.get_svg();
        svg.setAttribute("width", width);
        svg.setAttribute("height", width);
        svg.innerHTML = '<circle cx="' + width / 2 + '" cy="' + width / 2 + '" r="' + r + '" />';
    }
    get_properties_name() {
        return ["rayon"]
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.draw();
    }
    getArea() {
        let r = this.properties[0];
        return round(Math.PI * r * r, 2);
    }
    getPerimeter() {
        // renvoie l'aire du shape
        let r = this.properties[0];
        return round(2 * Math.PI + r, 2);
    }
}

class Ellipse extends Shape {
    type = "ellipse";
    properties = [100, 200];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let w = 2 * this.properties[1] + 2 * this.border_weight;
            let h = 2 * this.properties[0] + 2 * this.border_weight;
            svg.setAttribute("width", w);
            svg.setAttribute("height", h);
            svg.innerHTML = '<ellipse cx="' + w / 2 + '" cy="' + h / 2 + '" rx="' + this.properties[1] + '" ry="' + this.properties[0] + '" />';
            paper.append(svg);
        }
    }

    update_svg() {
        let svg = this.get_svg();
        let w = 2 * this.properties[1] + 2 * this.border_weight;
        let h = 2 * this.properties[0] + 2 * this.border_weight;
        svg.setAttribute("width", w);
        svg.setAttribute("height", h);
        svg.innerHTML = '<ellipse cx="' + w / 2 + '" cy="' + h / 2 + '" rx="' + this.properties[1] + '" ry="' + this.properties[0] + '" />';
    }
    get_properties_name() {
        return ["ry", "rx"]
    }
    scale(k) {
        super.scale(k);
        this.properties[0] *= k;
        this.properties[1] *= k;
        this.draw();
    }
    getArea() {
        let r1 = this.properties[0];
        let r2 = this.properties[1];
        return round(Math.PI * r1 * r2, 2);
    }
    getPerimeter() {
        // renvoie l'aire du shape
        let r1 = this.properties[0];
        let r2 = this.properties[1];
        let area = Math.PI * (3 * (r1 + r2) - Math.sqrt((3 * r1 + r2) * (r1 + 3 * r2)))
        return round(area, 2);
    }
    getCustomCalcul() {
        let r1 = this.properties[0];
        let r2 = this.properties[1];
        let distance_focal = round(Math.sqrt(Math.abs(r1 * r1 - r2 * r2)), 2)
        return [["distance focal", distance_focal]];
    }
}

class Text extends Shape {
    type = "text";
    properties = ["text", 24, 400, "", ""];
    add_svg() {
        let paper = this.get_paper();
        if (paper) {
            let svg = super.add_svg();
            let text = this.properties[0]
            let size = this.properties[1] ? this.properties[1] : 150;
            let weight = this.properties[2] ? this.properties[2] : 400;
            let family = this.properties[3] ? this.properties[3] : "";
            let style = this.properties[4] ? this.properties[4] : "";
            let w = text.length * size;
            svg.setAttribute("width", w);
            svg.setAttribute("height", 1.2 * size);
            svg.setAttribute("style", 'font-style: ' + style + ';font-weight:' + weight + ';font-size:' + size + 'px;font-family:' + family + ';');
            svg.innerHTML = '<text x="0" y="' + size + '">' + text + '</text>';
            paper.append(svg);
        }
    }
    update_svg() {
        let svg = this.get_svg();
        let text = this.properties[0]
        let size = this.properties[1] ? this.properties[1] : 150;
        let weight = this.properties[2] ? this.properties[2] : 400;
        let family = this.properties[3] ? this.properties[3] : "";
        let style = this.properties[4] ? this.properties[4] : "";
        let w = text.length * size;
        svg.setAttribute("width", w);
        svg.setAttribute("height", 1.2 * size);
        svg.setAttribute("style", 'font-style: ' + style + ';font-weight:' + weight + ';font-size:' + size + 'px;font-family:' + family + ';');
        svg.innerHTML = ' <text x="0" y="' + size + '">' + text + '</text>';
    }
    get_properties_name() {
        return ["text", "size", "weight", "family", "style"]
    }
    scale(k) {
        super.scale(k);
        this.properties[1] *= k;
        this.draw();
    }
}

const SHAPES = {
    square: Square,
    rectangle: Rectangle,
    circle: Circle,
    text: Text,
    triangle: Triangle,
    ellipse: Ellipse,
    hexagone: Hexagone,
    losange: Losange
}
