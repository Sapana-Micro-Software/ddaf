// SVG Utility Functions for DDAF Charts
// Copyright (C) 2025, Shyamal Suhana Chandra

export class SVGUtils {
    private static readonly SVG_NS = 'http://www.w3.org/2000/svg';
    private static readonly XLINK_NS = 'http://www.w3.org/1999/xlink';

    /**
     * Create an SVG element with proper namespace
     */
    static createElement(tagName: string): SVGElement {
        return document.createElementNS(this.SVG_NS, tagName) as any;
    }

    /**
     * Create an SVG with proper dimensions and viewBox
     */
    static createSVG(width: number, height: number, className?: string): SVGSVGElement {
        const svg = this.createElement('svg') as SVGSVGElement;
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('xmlns', this.SVG_NS);
        if (className) {
            svg.setAttribute('class', className);
        }
        return svg;
    }

    /**
     * Create a linear gradient
     */
    static createLinearGradient(
        id: string,
        stops: Array<{ offset: string; color: string; opacity?: number }>
    ): SVGLinearGradientElement {
        const gradient = this.createElement('linearGradient') as SVGLinearGradientElement;
        gradient.setAttribute('id', id);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');

        stops.forEach((stop, index) => {
            const stopElement = this.createElement('stop') as SVGStopElement;
            stopElement.setAttribute('offset', stop.offset);
            stopElement.setAttribute('stop-color', stop.color);
            if (stop.opacity !== undefined) {
                stopElement.setAttribute('stop-opacity', stop.opacity.toString());
            }
            gradient.appendChild(stopElement);
        });

        return gradient;
    }

    /**
     * Create a glow filter
     */
    static createGlowFilter(id: string, stdDeviation: number = 3): SVGFilterElement {
        const filter = this.createElement('filter') as SVGFilterElement;
        filter.setAttribute('id', id);
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');

        const feGaussianBlur = this.createElement('feGaussianBlur') as SVGFEGaussianBlurElement;
        feGaussianBlur.setAttribute('stdDeviation', stdDeviation.toString());
        feGaussianBlur.setAttribute('result', 'coloredBlur');

        const feMerge = this.createElement('feMerge') as SVGFEMergeElement;
        const feMergeNode1 = this.createElement('feMergeNode') as SVGFEMergeNodeElement;
        feMergeNode1.setAttribute('in', 'coloredBlur');
        const feMergeNode2 = this.createElement('feMergeNode') as SVGFEMergeNodeElement;
        feMergeNode2.setAttribute('in', 'SourceGraphic');

        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);

        filter.appendChild(feGaussianBlur);
        filter.appendChild(feMerge);

        return filter;
    }

    /**
     * Create a text element
     */
    static createText(
        x: number,
        y: number,
        text: string,
        options?: {
            anchor?: 'start' | 'middle' | 'end';
            fontSize?: number;
            fontWeight?: string | number;
            fill?: string;
            className?: string;
        }
    ): SVGTextElement {
        const textElement = this.createElement('text') as SVGTextElement;
        textElement.setAttribute('x', x.toString());
        textElement.setAttribute('y', y.toString());
        textElement.textContent = text;

        if (options) {
            if (options.anchor) {
                textElement.setAttribute('text-anchor', options.anchor);
            }
            if (options.fontSize) {
                textElement.setAttribute('font-size', options.fontSize.toString());
            }
            if (options.fontWeight) {
                textElement.setAttribute('font-weight', options.fontWeight.toString());
            }
            if (options.fill) {
                textElement.setAttribute('fill', options.fill);
            }
            if (options.className) {
                textElement.setAttribute('class', options.className);
            }
        }

        return textElement;
    }

    /**
     * Create a rectangle
     */
    static createRect(
        x: number,
        y: number,
        width: number,
        height: number,
        options?: {
            fill?: string;
            stroke?: string;
            strokeWidth?: number;
            rx?: number;
            ry?: number;
            filter?: string;
            className?: string;
        }
    ): SVGRectElement {
        const rect = this.createElement('rect') as SVGRectElement;
        rect.setAttribute('x', x.toString());
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());

        if (options) {
            if (options.fill) {
                rect.setAttribute('fill', options.fill);
            }
            if (options.stroke) {
                rect.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                rect.setAttribute('stroke-width', options.strokeWidth.toString());
            }
            if (options.rx) {
                rect.setAttribute('rx', options.rx.toString());
            }
            if (options.ry) {
                rect.setAttribute('ry', options.ry.toString());
            }
            if (options.filter) {
                rect.setAttribute('filter', options.filter);
            }
            if (options.className) {
                rect.setAttribute('class', options.className);
            }
        }

        return rect;
    }

    /**
     * Create a line
     */
    static createLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        options?: {
            stroke?: string;
            strokeWidth?: number;
            strokeDasharray?: string;
        }
    ): SVGLineElement {
        const line = this.createElement('line') as SVGLineElement;
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());

        if (options) {
            if (options.stroke) {
                line.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                line.setAttribute('stroke-width', options.strokeWidth.toString());
            }
            if (options.strokeDasharray) {
                line.setAttribute('stroke-dasharray', options.strokeDasharray);
            }
        }

        return line;
    }

    /**
     * Create a circle
     */
    static createCircle(
        cx: number,
        cy: number,
        r: number,
        options?: {
            fill?: string;
            stroke?: string;
            strokeWidth?: number;
        }
    ): SVGCircleElement {
        const circle = this.createElement('circle') as SVGCircleElement;
        circle.setAttribute('cx', cx.toString());
        circle.setAttribute('cy', cy.toString());
        circle.setAttribute('r', r.toString());

        if (options) {
            if (options.fill) {
                circle.setAttribute('fill', options.fill);
            }
            if (options.stroke) {
                circle.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                circle.setAttribute('stroke-width', options.strokeWidth.toString());
            }
        }

        return circle;
    }

    /**
     * Create a path
     */
    static createPath(
        d: string,
        options?: {
            fill?: string;
            stroke?: string;
            strokeWidth?: number;
            className?: string;
        }
    ): SVGPathElement {
        const path = this.createElement('path') as SVGPathElement;
        path.setAttribute('d', d);

        if (options) {
            if (options.fill) {
                path.setAttribute('fill', options.fill);
            }
            if (options.stroke) {
                path.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                path.setAttribute('stroke-width', options.strokeWidth.toString());
            }
            if (options.className) {
                path.setAttribute('class', options.className);
            }
        }

        return path;
    }

    /**
     * Create a group element
     */
    static createGroup(className?: string, transform?: string): SVGGElement {
        const group = this.createElement('g') as SVGGElement;
        if (className) {
            group.setAttribute('class', className);
        }
        if (transform) {
            group.setAttribute('transform', transform);
        }
        return group;
    }

    /**
     * Ensure SVG is visible and properly sized
     */
    static ensureSVGVisible(container: HTMLElement, svg: SVGSVGElement): void {
        if (container.offsetParent === null) {
            // Container is hidden, set explicit dimensions
            const width = container.offsetWidth || container.clientWidth || 800;
            const height = container.offsetHeight || container.clientHeight || 350;
            svg.setAttribute('width', width.toString());
            svg.setAttribute('height', height.toString());
        }
    }

    /**
     * Sanitize ID for use in SVG
     */
    static sanitizeId(id: string): string {
        return id.replace(/[^a-zA-Z0-9]/g, '_');
    }
}
