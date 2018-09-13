import os
from os.path import isdir
from distutils.util import strtobool

from .base import *

DEBUG = strtobool(os.environ.get('DEBUG', 'False'))

SECRET_KEY = 'psix(*d87_-#a-na-change-th!s-for-prod_j6n@d&xi395h!6dwah'

ALLOWED_HOSTS = ('*',) #('.psiprivacy.org', )

# Use host forwarded from nginx
#
USE_X_FORWARDED_HOST = True


# -----------------------------------
# initial setup before external sql db
# -----------------------------------
LOCAL_SETUP_DIR = os.environ.get(\
                        'LOCAL_SETUP_DIR',
                        join(BASE_DIR, 'test_setup_local'))
if not isdir(LOCAL_SETUP_DIR):
    os.makedirs(LOCAL_SETUP_DIR)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': join(LOCAL_SETUP_DIR, 'psi_database.db3'),
    }
}

# -----------------------------------
# staticfiles served via nginx
# -----------------------------------
STATIC_ROOT = join('/psi_volume', 'staticfiles', 'static')
if not os.path.isdir(STATIC_ROOT):
    os.makedirs(STATIC_ROOT)

SESSION_COOKIE_NAME = os.environ.get('PSI_SESSION_COOKIE_NAME',
                                     'psiprivacy_gce')
CSRF_COOKIE_NAME = 'psiprivacy_gce_csrf'
