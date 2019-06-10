function drawDiagram() {

    ctx = dc.getContext("2d")

    drawing_objects = di.value.split('\n')

    clearDiagram()

    for (i in drawing_objects) {

        drawing_object = drawing_objects[i]

        if (drawing_object.length < 3) {
            continue
        }

        if (!drawing_object.includes("{")) {
            continue
        }

        if (!drawing_object.includes("}")) {
            continue
        }

        if (!drawing_object.includes('"o"')) {
            continue
        }

        drawing_object = JSON.parse(drawing_object)

        switch (drawing_object["o"]) {

            case "strokeStyle":
                color = drawing_object["color"]
                ctx.strokeStyle = color
                break

            case "font":
                font = drawing_object["font"]
                ctx.font = font
                break

            case "lineWidth":
                lineWidth = drawing_object["lineWidth"]
                ctx.lineWidth = lineWidth

            case "fillText":
                text = drawing_object["text"]
                x = drawing_object["x"]
                y = drawing_object["y"]
                ctx.fillText(text, x, y)
                break

            case "line":
                ctx.beginPath()
                x1 = drawing_object["x1"]
                y1 = drawing_object["y1"]
                x2 = drawing_object["x2"]
                y2 = drawing_object["y2"]
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()
                break

            case "rect":
                ctx.beginPath()
                x = drawing_object["x"]
                y = drawing_object["y"]
                w = drawing_object["w"]
                h = drawing_object["h"]
                ctx.strokeRect(x, y, w, h)
                break

            case "arc":
                ctx.beginPath()
                x = drawing_object["x"]
                y = drawing_object["y"]
                r = drawing_object["r"]
                s = drawing_object["s"] * Math.PI
                e = drawing_object["e"] * Math.PI
                ctx.arc(x, y, r, s, e)
                ctx.stroke()
                break

            case "tri":
                ctx.beginPath()
                x1 = drawing_object["x1"]
                y1 = drawing_object["y1"]
                x2 = drawing_object["x2"]
                y2 = drawing_object["y2"]
                x3 = drawing_object["x3"]
                y3 = drawing_object["y3"]
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.lineTo(x3, y3)
                ctx.closePath()
                ctx.stroke()
                break
        }

    }
}
