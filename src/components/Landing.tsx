import React from 'react';
import LandingLayout from '@/app/(landing)/layout';

export default function LandingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingLayout>{children}</LandingLayout>;
}
