import { Button, GetRef } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useRef, useState } from 'react';
import { transSummary } from '../services/utils';
import { useSubjectsContext } from '../contexts/subject';

type ParaRef = GetRef<typeof Paragraph>;

const Summary = () => {
  const text = useSubjectsContext('summary');
  const phrase = transSummary(text);
  const [collapsed, setCollapse] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const paraRef = useRef<ParaRef>(null);

  useEffect(() => {
    if (paraRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(paraRef.current).lineHeight
      );
      const height = paraRef.current.getBoundingClientRect().height;
      const lc = Math.floor(height / lineHeight);
      setLineCount(lc);
      if (lc > 10) setCollapse(true);
    }
  }, [text]);
  return (
    <>
      <Paragraph
        ref={paraRef}
        style={{
          lineHeight: '1.5',
          maxHeight: collapsed ? '15em' : 'none',
          overflow: 'hidden',
          margin: 0,
        }}
      >
        <>
          {typeof phrase === 'string'
            ? phrase
            : phrase.map((p, i) => [p, <br key={i} />])}
        </>
      </Paragraph>
      {lineCount > 10 && (
        <div style={{ display: 'flex', justifyContent: 'right'}}>
          <Button
            type='link'
            onClick={() => setCollapse(!collapsed)}
            style={{ padding: 0, margin: '0 20px 0 auto' }}
          >
            {collapsed ? 'more...' : 'less⬆'}
          </Button>
        </div>
      )}
    </>
  );
};

export default Summary;
