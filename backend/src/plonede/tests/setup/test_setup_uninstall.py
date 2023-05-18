from plonede import PACKAGE_NAME

import pytest


class TestSetupUninstall:
    @pytest.fixture(autouse=True)
    def uninstalled(self, installer):
        installer.uninstall_product(PACKAGE_NAME)

    def test_product_uninstalled(self, installer):
        """Test if plonede is cleanly uninstalled."""
        assert installer.is_product_installed(PACKAGE_NAME) is False

    def test_browserlayer_removed(self, browser_layers):
        """Test that IPLONEDELayer is removed."""
        from plonede.interfaces import IPLONEDELayer

        assert IPLONEDELayer not in browser_layers