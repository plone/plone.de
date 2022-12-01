"""Setup tests for this package."""
from kitconcept import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plonede.testing import PLONEDE_INTEGRATION_TESTING  # noqa: E501
from Products.CMFPlone.utils import get_installer

import unittest


class TestSetup(unittest.TestCase):
    """Test that plonede is properly installed."""

    layer = PLONEDE_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        self.installer = get_installer(self.portal, self.layer["request"])

    def test_product_installed(self):
        """Test if plonede is installed."""
        self.assertTrue(self.installer.is_product_installed("plonede"))

    def test_browserlayer(self):
        """Test that IPLONEDELayer is registered."""
        from plone.browserlayer import utils
        from plonede.interfaces import IPLONEDELayer

        self.assertIn(IPLONEDELayer, utils.registered_layers())

    def test_latest_version(self):
        """Test latest version of default profile."""
        self.assertEqual(
            self.setup.getLastVersionForProfile("plonede:default")[0],
            "20220922001",
        )


class TestUninstall(unittest.TestCase):

    layer = PLONEDE_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal, self.layer["request"])
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstall_product("plonede")
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if plonede is cleanly uninstalled."""
        self.assertFalse(self.installer.is_product_installed("plonede"))

    def test_browserlayer_removed(self):
        """Test that IPLONEDELayer is removed."""
        from plone.browserlayer import utils
        from plonede.interfaces import IPLONEDELayer

        self.assertNotIn(IPLONEDELayer, utils.registered_layers())
