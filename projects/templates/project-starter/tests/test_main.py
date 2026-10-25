import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))
from main import init_app

class TestProjectStarter(unittest.TestCase):
    def test_init_app(self):
        self.assertEqual(init_app(), "CyberHelix Project Initialized")

if __name__ == "__main__":
    unittest.main()
