import '../../app/globals.css';

import React, { useState, useRef, useEffect } from 'react';

import { Layout, Menu, theme } from 'antd';
const { Sider, Content } = Layout;

import { AppLayout } from '../../common/components/AppLayout';

import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

import { APP_DEV_MAP_DATA } from '../../data/appdev';

const transformer = new Transformer();

export default function Mindmap() {

  const [appDevData, setAppDevData] = useState(APP_DEV_MAP_DATA);
  const appDevSvgRef = useRef<SVGSVGElement>(null);
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

  return (<AppLayout>
    <Layout style={{flex: 1, backgroundColor: 'gray'}}>
      <Sider>
        <div>Menu</div>
      </Sider>
      <Content>
        <h1>Roadmap</h1>
        <h2>App Developer Roadmap</h2>
        <svg width="800" height="600" ref={appDevSvgRef} />
      </Content>
    </Layout>
  </AppLayout>);
}