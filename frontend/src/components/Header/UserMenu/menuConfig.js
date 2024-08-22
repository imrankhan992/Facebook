export const menuConfig = {
    main: [
        { label: 'Settings and Privacy', action: 'settingsPrivacy', icon: "settings_filled_icon" },
        { label: 'Help and Support', action: 'helpSupport', icon: "help_filled_icon", link: "/help" },
        { label: 'Feedback', action: 'feedback', icon: "report_filled_icon", link: "/feedback" },
        { label: 'Display and Accessibility', action: 'displayAccessibility', icon: "dark_filled_icon", link: "/display-accessibility" },
        { label: 'Logout', action: 'logout', icon: "logout_filled_icon", link: "/logout" },
    ],
    settingsPrivacy: [
        { label: 'Privacy Checkup', action: 'privacyCheckup' },
        { label: 'Language', action: 'language', link: "/language" },
        { label: 'Activity Log', action: 'activityLog', link: "/activity-log" },
    ],
    privacyCheckup: [
        { label: 'Review Settings', action: 'reviewSettings' },
        { label: 'Manage Permissions', action: 'managePermissions' },
    ],
    reviewSettings: [
        { label: 'Public Profile', action: 'publicProfile', link: "/public-profile" },
        { label: 'Account Security', action: 'accountSecurity', link: "/account-security" },
    ],
    managePermissions: [
        { label: 'App Permissions', action: 'appPermissions', link: "/app-permissions" },
        { label: 'Data Sharing', action: 'dataSharing', link: "/data-sharing" },
    ],
    helpSupport:[
        { label: 'Help Center', action: 'helpCenter', link: "/help-center" },
        { label: 'Report a Problem', action: 'reportProblem', link: "/report-problem" },

    ]
};
