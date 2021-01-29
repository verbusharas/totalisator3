const vfxParallax = () => {
// html setup
    const itemsHTMLCollection = document.getElementsByClassName("parallax-item");
    const items = Array.from(itemsHTMLCollection);

    const html = document.documentElement;

// input setup
    const input = {
        scrollY: {
            start: 0,
            end: html.scrollHeight - window.innerHeight,
            current: 0,
        },
        mouseX: {
            start: 0,
            end: document.body.scrollWidth,
            current: 0,
        },
        mouseY: {
            start: 0,
            end: window.innerHeight,
            current: 0,
        },
    };
    input.scrollY.range = input.scrollY.end - input.scrollY.start;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;

// output setup
    const output = {
        x: {
            start: -20,
            end: 20,
            current: 0,
        },

        scrollY: {
            start: 0,
            end: 300,
            current: 0,
        },
        y: {
            start: -20,
            end: 20,
            current: 0,
        },
        zIndex: {
            range: 10,
        },
        scale: {
            start: 1,
            end: 0.95,
        },
        blur: {
            startingDepth: 0.4,
            range: 2,
        },
    };
    output.scale.range = output.scale.end - output.scale.start;
    output.x.range = output.x.end - output.x.start;
    output.y.range = output.y.end - output.y.start;
    output.scrollY.range = output.scrollY.end - output.scrollY.start;

    const mouse = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5,
    };

    const registerInputs = () => {
        // register mouse x, y inputs and calculate fractions
        input.mouseX.current = mouse.x;
        input.mouseX.fraction =
            (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
        input.mouseY.current = mouse.y;
        input.mouseY.fraction =
            (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

        // register scroll y input
        input.scrollY.current = html.scrollTop;
        input.scrollY.fraction =
            (input.scrollY.current - input.scrollY.start) / input.scrollY.range;
    };

    const offsetOutputs = () => {
        // calculate and set x and y outputs
        output.x.current = output.x.end - input.mouseX.fraction * output.x.range;
        output.y.current = output.y.end - input.mouseY.fraction * output.y.range;

        output.scrollY.current =
            output.scrollY.start + input.scrollY.fraction * output.scrollY.range;
    };

    const applyParallaxDepth = () => {
        // calculate outputs
            items.forEach((item, i) => {
                const depth = parseFloat(item.dataset.depth, 10);

                const itemUniqueInput = {
                    scrollY: {
                        start: item.offsetParent.offsetTop,
                        end: item.offsetParent.offsetTop + window.innerHeight,
                    },
                };
                itemUniqueInput.scrollY.range =
                    itemUniqueInput.scrollY.end - itemUniqueInput.scrollY.start;
                itemUniqueInput.scrollY.fraction =
                    (input.scrollY.current - itemUniqueInput.scrollY.start) /
                    itemUniqueInput.scrollY.range;

                const itemUniqueOutputYCurrent =
                    output.scrollY.start +
                    itemUniqueInput.scrollY.fraction * output.scrollY.range;

                const itemParallaxOutput = {
                    x: output.x.current - output.x.current * depth,
                    y: (itemUniqueOutputYCurrent * depth) + (output.y.current - (output.y.current * depth)),
                    zIndex: output.zIndex.range - output.zIndex.range * depth,
                    scale: output.scale.start + output.scale.range * depth,
                    blur: (depth - output.blur.startingDepth) * output.blur.range,
                };

                // set HTML item styles
                item.style.filter = `blur(${itemParallaxOutput.blur}px)`;
                item.style.zIndex = itemParallaxOutput.zIndex;
                item.style.transform = `scale(${itemParallaxOutput.scale}) translate(${itemParallaxOutput.x}px, ${itemParallaxOutput.y}px)`;
            });
    };

    const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        registerInputs();
        offsetOutputs();
        applyParallaxDepth();
    };

    const handleScroll = () => {
        registerInputs();
        offsetOutputs();
        applyParallaxDepth();
    };

    const handleResize = () => {
        input.mouseX.end = document.body.scrollWidth;
        input.mouseY.end = window.innerHeight;
        input.mouseX.range = input.mouseX.end - input.mouseX.start;
        input.mouseY.range = input.mouseY.end - input.mouseY.start;
        input.scrollY.end = html.scrollHeight - window.innerHeight;
        input.scrollY.range = input.scrollY.end - input.scrollY.start;
    };

    const addListeners = () => {
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
    }


    registerInputs();
    offsetOutputs();
    applyParallaxDepth();
    addListeners();
}

export default vfxParallax();



