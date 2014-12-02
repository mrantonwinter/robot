using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using robot.Controllers;

namespace robot.Tests
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void ControllerExists()
        {
            Assert.IsNotNull(new HomeController());
        }
    }
}
