export const checkAuthorization = async (req, res, allowedRoles, iDKaryawan) => {
    try {
      const authenticatedUser = req.user; // Extract user from `req`
  
      if (!authenticatedUser) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
  
      const userRole = authenticatedUser.Karyawan.HakAkses;
  
      // ✅ Allow access if role is authorized OR if user is accessing their own data
      const isAuthorized = allowedRoles.includes(userRole) || req.userId === parseInt(iDKaryawan);
  
      if (!isAuthorized) {
        return res.status(403).json({ message: "Access denied!" });
      }
  
      return null; // ✅ No error, authorization successful
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };