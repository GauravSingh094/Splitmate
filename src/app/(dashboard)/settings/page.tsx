'use client';

import { useTheme } from '@/providers/theme-provider';
import { Eye, Monitor, Moon, Sun, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/navigation/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useCurrentUser } from '@/features/users/queries';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { data: user } = useCurrentUser();

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Preferences & Settings
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Customize your application experience and system preferences
            </p>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection className="mx-auto w-full max-w-4xl">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="mb-6 flex-wrap">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                <TabsTrigger value="account">Account & System</TabsTrigger>
              </TabsList>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <Card variant="raised" className="space-y-4 border-border p-6 shadow-neo-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground">Theme Preference</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Choose your preferred color theme for Splito UI.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                    <Card
                      variant="interactive"
                      onClick={() => setTheme('light')}
                      className={`flex cursor-pointer flex-col items-center gap-3 p-4 text-center ${
                        theme === 'light' ? 'border-primary bg-primary/5 shadow-neo-2' : ''
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-raised text-foreground">
                        <Icon icon={Sun} size={20} />
                      </div>
                      <span className="text-sm font-bold">Light Mode</span>
                    </Card>

                    <Card
                      variant="interactive"
                      onClick={() => setTheme('dark')}
                      className={`flex cursor-pointer flex-col items-center gap-3 p-4 text-center ${
                        theme === 'dark' ? 'border-primary bg-primary/5 shadow-neo-2' : ''
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-raised text-foreground">
                        <Icon icon={Moon} size={20} />
                      </div>
                      <span className="text-sm font-bold">Dark Mode</span>
                    </Card>

                    <Card
                      variant="interactive"
                      onClick={() => setTheme('system')}
                      className={`flex cursor-pointer flex-col items-center gap-3 p-4 text-center ${
                        theme === 'system' ? 'border-primary bg-primary/5 shadow-neo-2' : ''
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-raised text-foreground">
                        <Icon icon={Monitor} size={20} />
                      </div>
                      <span className="text-sm font-bold">System Default</span>
                    </Card>
                  </div>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card variant="raised" className="space-y-4 border-border p-6 shadow-neo-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foreground">Profile Overview</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Manage your public identity details.
                      </p>
                    </div>
                    <Link href={ROUTES.dashboard.settings.profile}>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Icon icon={UserIcon} size={16} />}
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              </TabsContent>

              {/* Accessibility Tab */}
              <TabsContent value="accessibility">
                <Card variant="raised" className="space-y-4 border-border p-6 shadow-neo-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Accessibility Preferences
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Configure UI adjustments for improved readability and accessibility.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Card variant="surface" className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Icon icon={Eye} size={20} className="text-primary" />
                        <div>
                          <span className="block text-sm font-bold text-foreground">
                            Reduced Motion
                          </span>
                          <span className="text-2xs text-muted-foreground">
                            Minimizes smooth animations and layout shifts.
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" size="sm">
                        System Default
                      </Badge>
                    </Card>
                  </div>
                </Card>
              </TabsContent>

              {/* Account & System Tab */}
              <TabsContent value="account">
                <Card variant="raised" className="space-y-4 border-border p-6 shadow-neo-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Account & Environment Diagnostics
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      System status and authentication diagnostics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-2 text-xs sm:grid-cols-2">
                    <Card variant="surface" className="flex items-center justify-between p-4">
                      <span className="text-muted-foreground">Account Status</span>
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    </Card>
                    <Card variant="surface" className="flex items-center justify-between p-4">
                      <span className="text-muted-foreground">JWT Session</span>
                      <Badge variant="success" size="sm">
                        Valid
                      </Badge>
                    </Card>
                    <Card variant="surface" className="flex items-center justify-between p-4">
                      <span className="text-muted-foreground">API Environment</span>
                      <strong className="font-mono text-foreground">v1 (Production)</strong>
                    </Card>
                    <Card variant="surface" className="flex items-center justify-between p-4">
                      <span className="text-muted-foreground">User ID</span>
                      <strong className="max-w-[150px] truncate font-mono text-foreground">
                        {user?.id || '—'}
                      </strong>
                    </Card>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
