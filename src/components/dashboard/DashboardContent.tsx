import React from 'react';
import PlatformConnector from './PlatformConnector';
import QuickActions from './QuickActions';
import SocialFeed from './SocialFeed';
import UnifiedInbox from './UnifiedInbox';
import NotificationsPanel from './NotificationsPanel';

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PlatformConnector />
        <QuickActions />
        <SocialFeed />
      </div>
      <div className="space-y-6">
        <UnifiedInbox />
        <NotificationsPanel />
      </div>
    </div>
  );
}