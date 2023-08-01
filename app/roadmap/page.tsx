'use client'

import React, { useState, useRef, useEffect } from 'react';

import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

import { APP_DEV_MAP_DATA } from '../../data/roadmap/appdev';
import { CORE_DEV_MAP_DATA } from '../../data/roadmap/coredev';
import { ADV_MAP_DATA } from '../../data/roadmap/advanced';
import { BASIS_MAP_DATA } from '../../data/roadmap/basis';
import { ECOSYSTEM_MAP_DATA } from '../../data/roadmap/ecosystem'

const transformer = new Transformer();
let mm: any;

export default function Roadmap() {
    const [mmData, setMMData] = useState(BASIS_MAP_DATA);
    const appDevSvgRef = useRef<SVGSVGElement>(null);
    const refMm = useRef<Markmap>();

    const [appDevLinkActive, setAppDevLinkActive] = useState('');
    const [coreLinkActive, setCoreDevLinkActive] = useState('');
    const [ecosystemLinkActive, setEcosystemLinkActive] = useState('');
    const [basisLinkActive, setBasisLinkActive] = useState('active');
    const [advLinkActive, setAdvLinkActive] = useState('');

    const [titleName, setTitleName] = useState('Basis Blockchain');

    useEffect(() => {
        mm = Markmap.create(appDevSvgRef.current as SVGElement);
        refMm.current = mm;
    }, []);

    useEffect(() => {
        if (!mm) {
            return;
        }
        const { root } = transformer.transform(mmData);
        mm.setData(root);
        mm.fit();
    }, [mmData]);

    function changeRoadmapRole(role: string) {
        setAdvLinkActive('');
        setAppDevLinkActive('');
        setBasisLinkActive('');
        setCoreDevLinkActive('');
        setEcosystemLinkActive('');

        switch (role) {
            case 'app':
                setMMData(APP_DEV_MAP_DATA);
                setAppDevLinkActive('active');
                setTitleName('Application Developer');
                break;
            case 'core':
                setMMData(CORE_DEV_MAP_DATA);
                setCoreDevLinkActive('active');
                setTitleName('Core Developer');
                break;
            case 'basis':
                setMMData(BASIS_MAP_DATA);
                setBasisLinkActive('active');
                setTitleName('Basis Blockchain');
                break;
            case 'adv':
                setMMData(ADV_MAP_DATA);
                setAdvLinkActive('active');
                setTitleName('Advanced Blockchain');
                break;
            case 'ecosystem':
                setMMData(ECOSYSTEM_MAP_DATA);
                setEcosystemLinkActive('active');
                setTitleName('Ecosystem Expert');
                break;
            default:
                setMMData(APP_DEV_MAP_DATA);
                setAppDevLinkActive('active');
                setTitleName('Application Developer');
        }
    }

    return (
        <><div className="d-flex flex-column flex-shrink-0 my-3" style={{ width: "200px" }}>

            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <a href="#" className={"nav-link link-body-emphasis "+ basisLinkActive} onClick={() => { changeRoadmapRole('basis') }}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg> */}
                        Basis Blockchain
                    </a>
                </li>
                <li>
                    <a href="#" className={"nav-link link-body-emphasis "+ advLinkActive} onClick={() => { changeRoadmapRole('adv') }}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg> */}
                        Advanced Blockchain
                    </a>
                </li>
                <li>
                    <a href="#" className={"nav-link link-body-emphasis "+ appDevLinkActive} onClick={() => { changeRoadmapRole('app') }}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
                        Application Developer
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className={"nav-link link-body-emphasis "+ coreLinkActive} onClick={() => { changeRoadmapRole('core') }}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg> */}
                        Core Developer
                    </a>
                </li>
                <li>
                    <a href="#" className={"nav-link link-body-emphasis list-group-item-action disabled "+ ecosystemLinkActive} onClick={() => { changeRoadmapRole('ecosystem') }}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
                        Ecosystem Expert
                    </a>
                </li>
            </ul>
        </div>
            <div className="d-flex flex-column flex-shrink-0 px-3 my-3" style={{ width: "calc(100% - 200px)" }}>
                <h2>{titleName}</h2>
                <svg width="auto" height="auto" ref={appDevSvgRef} className="border"></svg>
            </div></>
    );
}
