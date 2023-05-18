"""Portal settings tests."""
from plone import api

import pytest


class TestPortalSettings:
    """Test that Portal configuration is correctly done."""

    @pytest.mark.parametrize(
            "setting,expected",
            [
                ["plone.default_language", "de"],
                ["plone.email_charset", "utf-8"],
                ["plone.site_title", "Plonede"],
            ]
    )
    def test_portal_settings(self, portal, setting, expected):
        """Test portal settings."""
        value = api.portal.get_registry_record(setting)
        assert value == expected, f"Incorrect value {setting}"