import React, { ReactNode } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';

interface CustomCardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({ title, children, footer, className }) => {
  return (
    <Card className={className}>
      {title && (
        <>
          <CardHeader>
            <h4 className="text-lg font-semibold">{title}</h4>
          </CardHeader>
          <Divider />
        </>
      )}
      <CardBody>{children}</CardBody>
      {footer && (
        <>
          <Divider />
          <CardFooter>{footer}</CardFooter>
        </>
      )}
    </Card>
  );
};