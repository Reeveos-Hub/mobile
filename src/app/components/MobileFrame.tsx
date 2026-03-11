/**
 * ReeveOS Mobile — Mobile Frame
 *
 * Previously rendered a fake iPhone preview (393x852px with rounded corners
 * and a Dynamic Island). Now replaced with a full-screen container that
 * fills the actual device viewport.
 *
 * Uses 100dvh (dynamic viewport height) which accounts for mobile browser
 * chrome (URL bar, bottom bar) on iOS Safari and Android Chrome.
 */

import React from 'react';
import { Outlet } from 'react-router';
import { BRAND, FONT } from '../lib/brand';

export function MobileFrame() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: BRAND.white,
        fontFamily: FONT.family,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
