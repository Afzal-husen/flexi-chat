import { userCollection } from "../collections/index.js";
import { FilterQuery, User } from "../../../types/user.js";

export const findOneUser = async (
  filterQuery: FilterQuery,
): Promise<User | null> => {
  try {
    const user = (await userCollection.findOne({ ...filterQuery })) as User;

    if (!user) return null;

    const { _id, email, username, password } = user;

    return {
      _id,
      email,
      username,
      password,
    };
  } catch (error: any) {
    return { error: true, message: error?.message || "Something went wrong" };
  }
};

export const insertIntoUser = async (userData: User) => {
  try {
    const user = await userCollection.insertOne({ ...userData });
    if (!user?.acknowledged)
      return {
        success: false,
        message: "An Error occured while creating user ",
      };
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
