import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while Signin",
      },
      { status: 500 },
    );
  }

  return NextResponse.redirect(origin);
};

export { handler as GET, handler as POST };
