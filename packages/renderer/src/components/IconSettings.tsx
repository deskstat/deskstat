import * as React from 'react';
import { useTheme } from 'styled-components';

const IconSettings = ({
  pathFillColor,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  pathFillColor?: string;
}) => {
  const theme = useTheme();
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"
        fill={pathFillColor || theme.colors.text1}
      />
      <path
        d="M2.845 16.136l1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 009 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.13 8.13 0 001.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 00-.731-2.732l-.505-.292a7.716 7.716 0 000-2.224l.505-.292a2.002 2.002 0 00.731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0015 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 00-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 00.731 2.732l.505.292a7.683 7.683 0 000 2.223l-.505.292a2.003 2.003 0 00-.731 2.733zm3.326-2.758A5.703 5.703 0 016 12c0-.462.058-.926.17-1.378a.999.999 0 00-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 001.188-.142 6.071 6.071 0 012.384-1.399A1 1 0 0011 5.3V4h2v1.3a1 1 0 00.708.956 6.083 6.083 0 012.384 1.399 1 1 0 001.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 00-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 00.471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 00-1.188.142 6.071 6.071 0 01-2.384 1.399A1 1 0 0013 18.7l.002 1.3H11v-1.3a1 1 0 00-.708-.956 6.083 6.083 0 01-2.384-1.399.992.992 0 00-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 00.471-1.108z"
        fill={pathFillColor || theme.colors.text1}
      />
    </svg>
  );
};

export default IconSettings;
