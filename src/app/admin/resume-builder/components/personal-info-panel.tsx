'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Save } from 'lucide-react';
import { useResumeBuilderStore } from '@/lib/resume-builder-store';
import { useState } from 'react';

export default function PersonalInfoPanel() {
  const { personalInfo, setPersonalInfo } = useResumeBuilderStore();
  const [localInfo, setLocalInfo] = useState(personalInfo);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setPersonalInfo(localInfo);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (field: string, value: string) => {
    setLocalInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <Badge variant="outline" className="text-xs">
              Step 2 of 4
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            Contact details for resume header
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Update your personal information. This will be used in the resume header and contact section.
        </p>
      </Card>

      {/* Personal Information Form */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              value={localInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Richard Maranga"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={localInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="rchdmaranga@gmail.com"
              className="w-full"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={localInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+254 748 004 282"
              className="w-full"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={localInfo.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Nairobi, Kenya"
              className="w-full"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              type="url"
              value={localInfo.linkedIn}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              placeholder="https://linkedin.com/in/richard-marangaa"
              className="w-full"
            />
          </div>

          {/* Portfolio */}
          <div className="space-y-2">
            <Label htmlFor="portfolio" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Portfolio Website
            </Label>
            <Input
              id="portfolio"
              type="url"
              value={localInfo.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              placeholder="https://marangaa.vercel.app/"
              className="w-full"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className="px-6">
            {saved ? (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin opacity-0"></div>
                ✓ Saved
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Information
              </div>
            )}
          </Button>
        </div>
      </Card>

      {/* Preview Card */}
      <Card className="p-6 bg-gray-50">
        <h3 className="font-semibold mb-3">Resume Header Preview</h3>
        <div className="text-sm space-y-2">
          <div className="font-medium text-gray-900">
            {localInfo.fullName || 'Your Name'}
          </div>
          <div className="text-gray-600">AI Engineer & Software Developer</div>
          <div className="grid grid-cols-2 gap-4 mt-3 text-xs text-gray-600">
            <div className="space-y-1">
              <div>📧 {localInfo.email || 'your.email@example.com'}</div>
              <div>🔗 {localInfo.linkedIn ? 'LinkedIn Profile' : 'LinkedIn Profile'}</div>
            </div>
            <div className="space-y-1">
              <div>📞 {localInfo.phone || '+1 (555) 123-4567'}</div>
              <div>🌐 {localInfo.portfolio ? 'Portfolio Website' : 'Portfolio Website'}</div>
            </div>
          </div>
          {localInfo.location && (
            <div className="text-xs text-gray-600 mt-2">
              📍 {localInfo.location}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
