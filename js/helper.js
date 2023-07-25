function Helper(){
    let positions = [];
    const deg2rad = (deg) => {
        return deg * Math.PI / 180;
    }
    const generatePosition = (points, {x:Cx,y:Cy}, size, rotation,strokeWidth, close) =>{
        positions = [];

        let increment = 360/points;
        let curAngle = rotation;

        while (curAngle < 360 + rotation  + (close?increment:0)){
            const newpos = {
                x: Cx + strokeWidth + (size * Math.sin(deg2rad(curAngle + rotation))) ,
                y: Cy + strokeWidth + (size * Math.cos(deg2rad(curAngle + rotation)))
            }
            positions.push(newpos);
            curAngle += increment;
        }

        return positions;
    }
    const generateCode = (color,width,positions, size) => {
        let dPath = 'M';
        positions.forEach((position,i)=>{
            if (i !== 0){
                dPath += ' L ';
            }
            dPath += position.x + ' ' + position.y;

        })
        dPath += ' Z';

        let codeString = 
        `<svg  height="${size}" width="${size}"> <path stroke="${color}" stroke-width="${width}" fill="none" d="${dPath}"/></svg>`

        return codeString;
    }

    return {
        code: generateCode,
        position: generatePosition
    }
}

export default Helper;