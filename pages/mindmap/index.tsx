import React, { useState, useRef, useEffect } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

import { APP_DEV_MAP_DATA } from '../../data/appdev';
import { CORE_DEV_MAP_DATA } from '../../data/coredev';

const transformer = new Transformer();

export default function Mindmap() {

    const [appDevData, setAppDevData] = useState(APP_DEV_MAP_DATA);
    const appDevSvgRef  = useRef<SVGSVGElement>(null);
    const refMm = useRef<Markmap>();

    useEffect(() => {
        const mm = Markmap.create(appDevSvgRef.current as SVGElement);
        refMm.current = mm;
        // Update data for markmap once value is changed
        if (!mm) return;
        const { root } = transformer.transform(appDevData);
        mm.setData(root);
        mm.fit();
      }, [appDevData]);

    return (<React.Fragment>
        <h1>Roadmap</h1>
        <h2>App Developer Roadmap</h2>
        <svg width="800" height="600" ref={appDevSvgRef} />
      </React.Fragment>);
}