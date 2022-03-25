// import { Router } from 'express';
// import {} from

// router.get(
//   '/',
//   rescue(async (req, res) => {
//     const users = await userService.getAll();
//     res.status(200).json(users);
//     }),
//   );

// router.get(
//     '/email',
//     rescue(async (req, res) => {
//       const { email } = req.body;
//       const userEmail = await userService.getEmail(email);

//       res.status(200).json(userEmail);
//       }),
//     );

// router.post(
//   '/',
//     rescue(async (req, res) => {
//     const { displayName, email, password, image } = req.body;

//     const user = await userService.create(displayName, email, password, image);

//     res.status(201).json(user);
//   }),
// );

// module.exports = router;
