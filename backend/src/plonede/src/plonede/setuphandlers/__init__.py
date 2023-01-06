from kitconcept import api
from kitconcept.contentcreator.creator import content_creator_from_folder
from pathlib import Path
from plonede import logger
from Products.CMFPlone.interfaces import INonInstallable
from zope.interface import implementer


@implementer(INonInstallable)
class HiddenProfiles(object):
    def getNonInstallableProfiles(self):
        """Hide uninstall profile from site-creation and quickinstaller."""
        return [
            "plonede:uninstall",
        ]


def populate_portal(context):
    """Post install script"""
    portal = api.portal.get()
    post_install(portal)
    # Create Initial content
    import_content(portal)
    logger.info("Created initial content")


def post_install(context):
    """Post install script"""
    portal = api.portal.get()
    logger.info(portal.title)


def package_root_folder() -> Path:
    """Get the dlr.internet fs path."""
    current_folder = Path(__file__).parent.resolve()
    return current_folder.parent


def import_content(context):
    """Creates dlr content"""
    cc_folder = package_root_folder() / "content_creator"
    content_creator_from_folder(
        folder_name=cc_folder,
        base_image_path=cc_folder / "images",
    )
